# meriyah

[![CircleCI](https://circleci.com/gh/meriyah/meriyah/tree/master.svg?style=svg)](https://circleci.com/gh/meriyah/meriyah/tree/master)

A 100% compliant, self-hosted javascript parser with high focus on both performance and stability.

## Features

* Conforms to the standard ECMAScript® 2020 (ECMA-262 10th Edition) language specification
* Support TC39 proposals via option
* Support for additional ECMAScript features for Web Browsers
* Optionally track syntactic node locations (*WIP*)
* Emits an ESTree-compatible abstract syntax tree.
* Very well tested (~63 000 unit tests with full code coverage))
* Lightweight - ~71 KB minified

## ESNext features

* [BigInt](https://github.com/tc39/proposal-bigint)
* [Decorators](https://github.com/tc39/proposal-decorators)
* [Hashbang Grammar](https://github.com/tc39/proposal-hashbang)
* [Private methods](https://github.com/tc39/proposal-private-methods)
* [Static class features](https://github.com/tc39/proposal-static-class-features/)

**Note:** These features need to be enabled with the `next` option.

## Options

The second argument allows you to specify various options:

| Option        | Description |
| ----------- | ------------------------------------------------------------ |
| `directives`      | Enable [directive prologue](https://github.com/danez/estree/blob/directive/es5.md#directive) to each literal node |
| `globalReturn`    | Allow return in the global scope |
| `impliedStrict`   | Enable strict mode initial enforcement |
| `module`          | Allow parsing in module code |
| `next`            | Allow parsing with `ESNext` features  |
| `raw`             | Attach raw property to each literal node |
| `webcompat`       | Enable [web compability](https://tc39.github.io/ecma262/#sec-additional-ecmascript-features-for-web-browsers) |

## API

Meriyah generates `AST` according to [ESTree AST format](https://github.com/estree/estree), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with `ES2015` and later a JavaScript program can be either [a script or a module](https://tc39.github.io/ecma262/index.html#sec-ecmascript-language-scripts-and-modules).

The `parse` method exposed by meriyah takes an optional `options` object which allows you to specify whether to parse in [`script`](https://tc39.github.io/ecma262/#sec-parse-script) mode (the default) or in [`module`](https://tc39.github.io/ecma262/#sec-parsemodule) mode.


Here is a quick example to parse a script:

```js

import { parseScript } from './meriyah';

parseScript('({x: [y] = 0} = 1)');

```

This will return when serialized in json:

```js
{
    type: "Program",
    sourceType: "script",
    body: [
        {
            type: "ExpressionStatement",
            expression: {
                type: "AssignmentExpression",
                left: {
                    type: "ObjectPattern",
                    properties: [
                        {
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x"
                            },
                            value: {
                                type: "AssignmentPattern",
                                left: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            "type": "Identifier",
                                            "name": "y"
                                        }
                                    ]
                                },
                                right: {
                                    type: "Literal",
                                    value: 0
                                }
                            },
                            kind: "init",
                            computed: false,
                            method: false,
                            shorthand: false
                        }
                    ]
                },
                operator: "=",
                right: {
                    type: "Literal",
                    value: 1
                }
            }
        }
    ]
}
```