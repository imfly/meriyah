import { Token } from './token';
import * as ESTree from './estree';
import { Context, ParserState, PropertyKind, Origin, Flags, OnComment, OnToken, BindingKind, HoistedClassFlags, HoistedFunctionFlags, ScopeState } from './common';
export declare function create(source: string, sourceFile: string | void, onComment: OnComment | void, onToken: OnToken | void): ParserState;
export interface Options {
    module?: boolean;
    next?: boolean;
    ranges?: boolean;
    webcompat?: boolean;
    loc?: boolean;
    raw?: boolean;
    directives?: boolean;
    globalReturn?: boolean;
    impliedStrict?: boolean;
    preserveParens?: boolean;
    lexical?: boolean;
    source?: string;
    identifierPattern?: boolean;
    jsx?: boolean;
    specDeviation?: boolean;
    onComment?: OnComment;
    onToken?: OnToken;
    uniqueKeyInPattern?: boolean;
}
export declare function parseSource(source: string, options: Options | void, context: Context): ESTree.Program;
export declare function parseStatementList(parser: ParserState, context: Context, scope: ScopeState | undefined): ESTree.Statement[];
export declare function parseModuleItemList(parser: ParserState, context: Context, scope: ScopeState | undefined): ReturnType<typeof parseDirective | typeof parseModuleItem>[];
export declare function parseModuleItem(parser: ParserState, context: Context, scope: ScopeState | undefined, start: number, line: number, column: number): any;
export declare function parseStatementListItem(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.Statement | ESTree.Decorator[];
export declare function parseStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, labels: ESTree.Labels, allowFuncDecl: 0 | 1, start: number, line: number, column: number): ESTree.Statement;
export declare function parseExpressionOrLabelledStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, labels: ESTree.Labels, allowFuncDecl: 0 | 1, start: number, line: number, column: number): ESTree.ExpressionStatement | ESTree.LabeledStatement;
export declare function parseBlock(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.BlockStatement;
export declare function parseReturnStatement(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.ReturnStatement;
export declare function parseExpressionStatement(parser: ParserState, context: Context, expression: ESTree.Expression, start: number, line: number, column: number): ESTree.ExpressionStatement;
export declare function parseLabelledStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, labels: ESTree.Labels, value: string, expr: ESTree.Identifier | ESTree.Expression, token: Token, allowFuncDecl: 0 | 1, start: number, line: number, column: number): ESTree.LabeledStatement;
export declare function parseAsyncArrowOrAsyncFunctionDeclaration(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, labels: ESTree.Labels, allowFuncDecl: 0 | 1, start: number, line: number, column: number): ESTree.ExpressionStatement | ESTree.LabeledStatement | ESTree.FunctionDeclaration;
export declare function parseDirective(parser: ParserState, context: Context, expression: ESTree.ArgumentExpression | ESTree.SequenceExpression | ESTree.Expression, token: Token, start: number, line: number, column: number): ESTree.ExpressionStatement;
export declare function parseEmptyStatement(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.EmptyStatement;
export declare function parseThrowStatement(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.ThrowStatement;
export declare function parseIfStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.IfStatement;
export declare function parseConsequentOrAlternative(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.Statement | ESTree.FunctionDeclaration;
export declare function parseSwitchStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.SwitchStatement;
export declare function parseWhileStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.WhileStatement;
export declare function parseIterationStatementBody(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels): ESTree.Statement;
export declare function parseContinueStatement(parser: ParserState, context: Context, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.ContinueStatement;
export declare function parseBreakStatement(parser: ParserState, context: Context, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.BreakStatement;
export declare function parseWithStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.WithStatement;
export declare function parseDebuggerStatement(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.DebuggerStatement;
export declare function parseTryStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.TryStatement;
export declare function parseCatchBlock(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.CatchClause;
export declare function parseDoWhileStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.DoWhileStatement;
export declare function parseLetIdentOrVarDeclarationStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, start: number, line: number, column: number): ESTree.VariableDeclaration | ESTree.LabeledStatement | ESTree.ExpressionStatement;
export declare function parseVariableStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, start: number, line: number, column: number): ESTree.VariableDeclaration;
export declare function parseVariableDeclarationList(parser: ParserState, context: Context, scope: ScopeState | undefined, kind: BindingKind, origin: Origin): ESTree.VariableDeclarator[];
export declare function parseForStatement(parser: ParserState, context: Context, scope: ScopeState | undefined, labels: ESTree.Labels, start: number, line: number, column: number): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement;
export declare function parseRestrictedIdentifier(parser: ParserState, context: Context, scope: ScopeState | undefined): ESTree.Identifier;
export declare function parseImportMetaDeclaration(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.ExpressionStatement;
export declare function parseExpression(parser: ParserState, context: Context, canAssign: 0 | 1, isPattern: 0 | 1, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.Expression;
export declare function parseSequenceExpression(parser: ParserState, context: Context, inGroup: 0 | 1, start: number, line: number, column: number, expr: ESTree.AssignmentExpression | ESTree.Expression): ESTree.SequenceExpression;
export declare function parseExpressions(parser: ParserState, context: Context, inGroup: 0 | 1, canAssign: 0 | 1, start: number, line: number, column: number): ESTree.SequenceExpression | ESTree.Expression;
export declare function parseAssignmentExpression(parser: ParserState, context: Context, inGroup: 0 | 1, isPattern: 0 | 1, start: number, line: number, column: number, left: ESTree.ArgumentExpression | ESTree.Expression | null): ESTree.ArgumentExpression | ESTree.Expression;
export declare function parseAssignmentExpressionOrPattern(parser: ParserState, context: Context, inGroup: 0 | 1, isPattern: 0 | 1, start: number, line: number, column: number, left: any): any;
export declare function parseConditionalExpression(parser: ParserState, context: Context, test: ESTree.Expression, start: number, line: number, column: number): ESTree.ConditionalExpression;
export declare function parseBinaryExpression(parser: ParserState, context: Context, inGroup: 0 | 1, start: number, line: number, column: number, minPrec: number, operator: Token, left: ESTree.ArgumentExpression | ESTree.Expression): ESTree.ArgumentExpression | ESTree.Expression;
export declare function parseUnaryExpression(parser: ParserState, context: Context, isLHS: 0 | 1, start: number, line: number, column: number, inGroup: 0 | 1): ESTree.UnaryExpression;
export declare function parseAsyncExpression(parser: ParserState, context: Context, inGroup: 0 | 1, isLHS: 0 | 1, canAssign: 0 | 1, isPattern: 0 | 1, inNew: 0 | 1, start: number, line: number, column: number): ESTree.FunctionExpression | ESTree.ArrowFunctionExpression | ESTree.CallExpression | ESTree.Identifier;
export declare function parseYieldExpression(parser: ParserState, context: Context, inGroup: 0 | 1, canAssign: 0 | 1, start: number, line: number, column: number): ESTree.YieldExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression;
export declare function parseAwaitExpression(parser: ParserState, context: Context, inNew: 0 | 1, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.IdentifierOrExpression | ESTree.AwaitExpression;
export declare function parseFunctionBody(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, firstRestricted: Token | undefined, scopeError: any): ESTree.BlockStatement;
export declare function parseSuperExpression(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.Super;
export declare function parseLeftHandSideExpression(parser: ParserState, context: Context, canAssign: 0 | 1, inGroup: 0 | 1, isLHS: 0 | 1, start: number, line: number, column: number): ESTree.Expression;
export declare function parseMemberOrUpdateExpression(parser: ParserState, context: Context, expr: ESTree.Expression, inGroup: 0 | 1, start: number, line: number, column: number): any;
export declare function parseOptionalChain(parser: ParserState, context: Context, start: number, line: number, column: number): any;
export declare function parsePropertyOrPrivatePropertyName(parser: ParserState, context: Context): any;
export declare function parseUpdateExpressionPrefixed(parser: ParserState, context: Context, inNew: 0 | 1, isLHS: 0 | 1, start: number, line: number, column: number): ESTree.UpdateExpression;
export declare function parsePrimaryExpression(parser: ParserState, context: Context, kind: BindingKind, inNew: 0 | 1, canAssign: 0 | 1, isPattern: 0 | 1, inGroup: 0 | 1, isLHS: 0 | 1, start: number, line: number, column: number): any;
export declare function parseImportMetaExpression(parser: ParserState, context: Context, meta: ESTree.Identifier, start: number, line: number, column: number): ESTree.MetaProperty;
export declare function parseImportExpression(parser: ParserState, context: Context, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.ImportExpression;
export declare function parseBigIntLiteral(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.BigIntLiteral;
export declare function parseTemplateLiteral(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.TemplateLiteral;
export declare function parseTemplate(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.TemplateLiteral;
export declare function parseTemplateElement(parser: ParserState, context: Context, tail: boolean): ESTree.TemplateElement;
export declare function parseArguments(parser: ParserState, context: Context, inGroup: 0 | 1): (ESTree.SpreadElement | ESTree.Expression)[];
export declare function parseIdentifier(parser: ParserState, context: Context, isPattern: 0 | 1): ESTree.Identifier;
export declare function parseLiteral(parser: ParserState, context: Context): ESTree.Literal;
export declare function parseNullOrTrueOrFalseLiteral(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.Literal;
export declare function parseThisExpression(parser: ParserState, context: Context): ESTree.ThisExpression;
export declare function parseFunctionDeclaration(parser: ParserState, context: Context, scope: ScopeState | undefined, origin: Origin, allowGen: 0 | 1, flags: HoistedFunctionFlags, isAsync: 0 | 1, start: number, line: number, column: number): ESTree.FunctionDeclaration;
export declare function parseFunctionExpression(parser: ParserState, context: Context, isAsync: 0 | 1, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.FunctionExpression;
export declare function parseArrayExpressionOrPattern(parser: ParserState, context: Context, scope: ScopeState | undefined, skipInitializer: 0 | 1, inGroup: 0 | 1, isPattern: 0 | 1, kind: BindingKind, origin: Origin, start: number, line: number, column: number): ESTree.ArrayExpression | ESTree.ArrayPattern | ESTree.AssignmentExpression;
export declare function parseMethodDefinition(parser: ParserState, context: Context, kind: PropertyKind, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.FunctionExpression;
export declare function parseObjectLiteralOrPattern(parser: ParserState, context: Context, scope: ScopeState | undefined, skipInitializer: 0 | 1, inGroup: 0 | 1, isPattern: 0 | 1, kind: BindingKind, origin: Origin, start: number, line: number, column: number): ESTree.ObjectExpression | ESTree.ObjectPattern | ESTree.AssignmentExpression;
export declare function parseMethodFormals(parser: ParserState, context: Context, scope: ScopeState | undefined, kind: PropertyKind, type: BindingKind, inGroup: 0 | 1): ESTree.Parameter[];
export declare function parseComputedPropertyName(parser: ParserState, context: Context, inGroup: 0 | 1): ESTree.Expression;
export declare function parseParenthesizedExpression(parser: ParserState, context: Context, canAssign: 0 | 1, kind: BindingKind, origin: Origin, start: number, line: number, column: number): any;
export declare function parseIdentifierOrArrow(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.Identifier | ESTree.ArrowFunctionExpression;
export declare function parseArrowFunctionExpression(parser: ParserState, context: Context, scope: ScopeState | undefined, params: any, isAsync: 0 | 1, start: number, line: number, column: number): ESTree.ArrowFunctionExpression;
export declare function parseFormalParametersOrFormalList(parser: ParserState, context: Context, scope: ScopeState | undefined, inGroup: 0 | 1, kind: BindingKind): ESTree.Parameter[];
export declare function parseMembeExpressionNoCall(parser: ParserState, context: Context, expr: ESTree.Expression, inGroup: 0 | 1, start: number, line: number, column: number): any;
export declare function parseNewExpression(parser: ParserState, context: Context, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.NewExpression | ESTree.Expression | ESTree.MetaProperty;
export declare function parseMetaProperty(parser: ParserState, context: Context, meta: ESTree.Identifier, start: number, line: number, column: number): ESTree.MetaProperty;
export declare function parseAsyncArrowOrCallExpression(parser: ParserState, context: Context, callee: ESTree.Identifier | void, canAssign: 0 | 1, kind: BindingKind, origin: Origin, flags: Flags, start: number, line: number, column: number): ESTree.CallExpression | ESTree.ArrowFunctionExpression;
export declare function parseRegExpLiteral(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.Literal;
export declare function parseClassDeclaration(parser: ParserState, context: Context, scope: ScopeState | undefined, flags: HoistedClassFlags, start: number, line: number, column: number): ESTree.ClassDeclaration;
export declare function parseClassExpression(parser: ParserState, context: Context, inGroup: 0 | 1, start: number, line: number, column: number): ESTree.ClassExpression;
export declare function parseDecorators(parser: ParserState, context: Context): ESTree.Decorator[];
export declare function parseDecoratorList(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.Decorator;
export declare function parseClassBody(parser: ParserState, context: Context, inheritedContext: Context, scope: ScopeState | undefined, kind: BindingKind, origin: Origin, inGroup: 0 | 1): ESTree.ClassBody;
export declare function parseFieldDefinition(parser: ParserState, context: Context, key: ESTree.PrivateName | ESTree.Expression | null, state: PropertyKind, decorators: ESTree.Decorator[] | null, start: number, line: number, column: number): ESTree.FieldDefinition;
export declare function parseBindingPattern(parser: ParserState, context: Context, scope: ScopeState | undefined, type: BindingKind, origin: Origin, start: number, line: number, column: number): ESTree.BindingPattern;
export declare function parseOpeningFragment(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.JSXOpeningFragment;
export declare function parseJSXClosingFragment(parser: ParserState, context: Context, inJSXChild: 0 | 1, start: number, line: number, column: number): ESTree.JSXClosingFragment;
export declare function parseJSXChildren(parser: ParserState, context: Context): ESTree.JSXChild[];
export declare function parseJSXText(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.JSXText;
export declare function parseJSXMemberExpression(parser: ParserState, context: Context, object: ESTree.JSXIdentifier | ESTree.JSXMemberExpression, start: number, line: number, column: number): ESTree.JSXMemberExpression;
export declare function parseJSXAttributes(parser: ParserState, context: Context): (ESTree.JSXAttribute | ESTree.JSXSpreadAttribute)[];
export declare function parseJSXSpreadAttribute(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.JSXSpreadAttribute;
export declare function parseJSXIdentifier(parser: ParserState, context: Context, start: number, line: number, column: number): ESTree.JSXIdentifier;
//# sourceMappingURL=parser.d.ts.map