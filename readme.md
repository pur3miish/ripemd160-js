![RIPEMD1600 logo](https://raw.githubusercontent.com/pur3miish/ripemd160-js/main/static/ripemd-160.svg)

# Ripemd160-js

[![NPM Package](https://img.shields.io/npm/v/ripemd160-js.svg)](https://www.npmjs.org/package/ripemd160-js) [![CI status](https://github.com/pur3miish/ripemd160-js/workflows/CI/badge.svg)](https://github.com/pur3miish/ripemd160-js/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/ripemd160-js/blob/main/LICENSE)

A [Universal JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) [RIPEMD160](https://en.bitcoin.it/wiki/RIPEMD-160) cryptographic hash function.

**Features**

- Zero dependency
- <7 KB gzip

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=16.0.0`
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).

## Installation

For [Node.js](https://nodejs.org), to install [`ripemd160-js`](https://npm.im/ripemd160-js) run:

```sh
npm install ripemd160-js
```

## Examples

Import For ESM

```js
import ripemd160 from "ripemd160-js/ripemd160.js";
```

**Digest Array**

```js
ripemd160(Uint8Array.from([1, 2, 3])).then(console.log);
```

> The logged output will be “79f901da2609f020adadbf2e5f68a16c8c3f7d57”
