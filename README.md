![RIPEMD1600 logo](https://raw.githubusercontent.com/pur3miish/ripemd160-js/main/static/ripemd-160.svg)

# ripemd160-js

A [Universal JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) RIPEMD160 function for

Adapted from [trezor ripemd160](https://github.com/trezor/trezor-crypto/blob/master/ripemd160.c)

# Setup

```shell
$ npm i ripemd160-js
```

# Support

- [Node.js](https://nodejs.org/en/) `>= 8`
- [Browser list](https://github.com/browserslist/browserslist) `defaults` `not IE 11`.

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
