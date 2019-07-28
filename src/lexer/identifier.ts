import { ParserState, Context } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars } from '../chars';
import { advanceChar, consumeMultiUnitCodePoint, fromCodePoint, toHex } from './';
import { CharTypes, CharFlags, isIdentifierPart, isIdentifierStart } from './charClassifier';
import { report, reportScannerError, Errors } from '../errors';

/**
 * Scans identifier
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function scanIdentifier(parser: ParserState, context: Context, isValidAsKeyword: 0 | 1): Token {
  while ((CharTypes[advanceChar(parser)] & CharFlags.IdentifierPart) !== 0) {}
  parser.tokenValue = parser.source.slice(parser.tokenPos, parser.index);
  return parser.currentChar !== Chars.Backslash && parser.currentChar < 0x7e
    ? descKeywordTable[parser.tokenValue] || Token.Identifier
    : scanIdentifierSlowCase(parser, context, 0, isValidAsKeyword);
}

/**
 * Scans unicode identifier
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function scanUnicodeIdentifier(parser: ParserState, context: Context): Token {
  const cookedChar = scanIdentifierUnicodeEscape(parser);
  if (!isIdentifierPart(cookedChar)) report(parser, Errors.InvalidUnicodeEscapeSequence);
  parser.tokenValue = fromCodePoint(cookedChar);
  return scanIdentifierSlowCase(parser, context, /* hasEscape */ 1, CharTypes[cookedChar] & CharFlags.KeywordCandidate);
}

/**
 * Scans identifier slow case
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param hasEscape True if contains a unicode sequence
 * @param isValidAsKeyword
 */
export function scanIdentifierSlowCase(
  parser: ParserState,
  context: Context,
  hasEscape: 0 | 1,
  isValidAsKeyword: number
): Token {
  let start = parser.index;

  while (parser.index < parser.end) {
    if (parser.currentChar === Chars.Backslash) {
      parser.tokenValue += parser.source.slice(start, parser.index);
      hasEscape = 1;
      const code = scanIdentifierUnicodeEscape(parser);
      if (!isIdentifierPart(code)) report(parser, Errors.InvalidUnicodeEscapeSequence);
      isValidAsKeyword = isValidAsKeyword && CharTypes[code] & CharFlags.KeywordCandidate;
      parser.tokenValue += fromCodePoint(code);
      start = parser.index;
    } else if (isIdentifierPart(parser.currentChar) || consumeMultiUnitCodePoint(parser, parser.currentChar)) {
      advanceChar(parser);
    } else {
      break;
    }
  }

  if (parser.index <= parser.end) {
    parser.tokenValue += parser.source.slice(start, parser.index);
  }

  const length = parser.tokenValue.length;

  if (isValidAsKeyword && (length >= 2 && length <= 11)) {
    const token: Token | undefined = descKeywordTable[parser.tokenValue];

    return token === void 0
      ? Token.Identifier
      : token === Token.YieldKeyword || !hasEscape
      ? token
      : context & Context.Strict && (token === Token.LetKeyword || token === Token.StaticKeyword)
      ? Token.EscapedFutureReserved
      : (token & Token.FutureReserved) === Token.FutureReserved
      ? context & Context.Strict
        ? Token.EscapedFutureReserved
        : token
      : Token.EscapedReserved;
  }
  return Token.Identifier;
}

/**
 * Scans private name
 *
 * @param parser  Parser object
 */
export function scanPrivateName(parser: ParserState): Token {
  if (!isIdentifierStart(advanceChar(parser))) report(parser, Errors.MissingPrivateName);
  return Token.PrivateField;
}

/**
 * Scans unicode identifier
 *
 * @param parser  Parser object
 */
export function scanIdentifierUnicodeEscape(parser: ParserState): number {
  // Check for Unicode escape of the form '\uXXXX'
  // and return code point value if valid Unicode escape is found.
  if (parser.source.charCodeAt(parser.index + 1) !== Chars.LowerU) {
    report(parser, Errors.InvalidUnicodeEscapeSequence);
  }
  parser.currentChar = parser.source.charCodeAt((parser.index += 2));
  return scanUnicodeEscape(parser);
}

/**
 * Scans unicode escape value
 *
 * @param parser  Parser object
 */
export function scanUnicodeEscape(parser: ParserState): number {
  // Accept both \uxxxx and \u{xxxxxx}
  let codePoint = 0;
  const char = parser.currentChar;
  // First handle a delimited Unicode escape, e.g. \u{1F4A9}
  if (char === Chars.LeftBrace) {
    const begin = parser.index - 2;
    while (CharTypes[advanceChar(parser)] & CharFlags.Hex) {
      codePoint = (codePoint << 4) | toHex(parser.currentChar);
      if (codePoint > Chars.NonBMPMax) reportScannerError(begin, parser.line, parser.index + 1, Errors.UnicodeOverflow);
    }

    // At least 4 characters have to be read
    if (codePoint < 1 || (parser.currentChar as number) !== Chars.RightBrace) {
      reportScannerError(begin, parser.line, parser.index - 1, Errors.InvalidHexEscapeSequence);
    }
    advanceChar(parser); // consumes '}'
    return codePoint;
  }

  if ((CharTypes[char] & CharFlags.Hex) === 0) report(parser, Errors.InvalidHexEscapeSequence); // first one is mandatory

  const char2 = parser.source.charCodeAt(parser.index + 1);
  if ((CharTypes[char2] & CharFlags.Hex) === 0) report(parser, Errors.InvalidHexEscapeSequence);
  const char3 = parser.source.charCodeAt(parser.index + 2);
  if ((CharTypes[char3] & CharFlags.Hex) === 0) report(parser, Errors.InvalidHexEscapeSequence);
  const char4 = parser.source.charCodeAt(parser.index + 3);
  if ((CharTypes[char4] & CharFlags.Hex) === 0) report(parser, Errors.InvalidHexEscapeSequence);

  codePoint = (toHex(char) << 12) | (toHex(char2) << 8) | (toHex(char3) << 4) | toHex(char4);

  parser.currentChar = parser.source.charCodeAt((parser.index += 4));

  return codePoint;
}
