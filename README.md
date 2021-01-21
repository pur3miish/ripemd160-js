![RIPEMD1600 logo](https://raw.githubusercontent.com/pur3miish/ripemd160-js/main/static/ripemd-160.svg)

# ripemd160-js

A [RIPEMD160](https://en.bitcoin.it/wiki/RIPEMD-160) cryptographic hash function for [Universal JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript).

This package has adapted [Trezor’s](https://github.com/trezor/trezor-crypto/blob/master/ripemd160.c) RIPEMD160 and compiled it to a stand alone web assembly file that can be readily consumed by JavaScript.

Please see my [wasm-ripemd160](https://github.com/pur3miish/ripemd160-wasm) code repo on how to acheive this.

_NB - this RIPEMD160 hash function has a 59 max character limit._

# Setup

```shell
$ npm i ripemd160-js
```

# Support

Ensure your JavaScript environment can support [Web Assembly](https://caniuse.com/?search=web%20assembly).

- [Node.js](https://nodejs.org/en/) `>= 8`
- [Browser list](https://github.com/browserslist/browserslist) `defaults` `not IE 11`

# API

## Table of contents

- [function ripemd160](#function-ripemd160)

## function ripemd160

Performs the message digest algorithm RIPEMD160 on input data.

| Parameter | Type                 | Description   |
| :-------- | :------------------- | :------------ |
| `message` | string \| Uint8Array | Data to hash. |

**Returns:** string | Uint8Array — Preserves the data return type.

### Examples

_Ways to `import`._

> ```js
> import ripemd160 from 'ripemd160-js'
> ```

_Ways to `require`._

> ```js
> const ripemd160 = require('ripemd160-js')
> ```

_Usage `Sting` `ripemd160`._

> ```js
> ripemd160('hello').then(console.log)
> ```
>
> The logged output will be “108f07b8382412612c048d07d13f814118445acd”.

_Usage `Uint8Array` `ripemd160`._

> ```js
> const print_hex = array => Buffer.from(array).toString('hex')
> ripemd160(new Uint8Array([1, 2, 3])).then(print_hex)
> ```
>
> The logged output will be “79f901da2609f020adadbf2e5f68a16c8c3f7d57”
