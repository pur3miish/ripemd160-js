![RIPEMD1600 logo](https://raw.githubusercontent.com/pur3miish/ripemd160-js/main/static/ripemd-160.svg)

# ripemd160-js

[![npm](https://img.shields.io/npm/v/ripemd160-js.svg?style=flat-square)](https://www.npmjs.com/package/ripemd160-js) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE) ![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square) ![Package Size](https://img.shields.io/badge/package-%E2%89%884%20KB-brightgreen.svg?style=flat-square) ![ESM](https://img.shields.io/badge/module-native%20ESM-blue.svg?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg?style=flat-square) ![Node](https://img.shields.io/badge/Node.js-%E2%89%A522-339933.svg?style=flat-square&logo=node.js&logoColor=white) ![Browser](https://img.shields.io/badge/browser-native-orange.svg?style=flat-square)

A tiny, dependency-free, isomorphic **RIPEMD-160** implementation for modern JavaScript and TypeScript.

Designed as a minimal cryptographic primitive:

- **≈4 KB package footprint (gzip & minify)**
- **Zero runtime dependencies**
- **Native ESM**
- **Node.js and browser compatible**
- **TypeScript declarations included**
- **`Uint8Array` in, `Uint8Array` out**
- **No Node.js `Buffer` dependency**
- **No WebAssembly runtime required**
- **No platform-specific crypto APIs**

The package operates directly on bytes, making it suitable for cryptographic, blockchain, protocol, encoding, and binary-data applications where RIPEMD-160 compatibility is required.

---

## Installation

```sh
npm install ripemd160-js
```

---

## Usage

```js
import { ripemd160 } from "ripemd160-js";

const input = new Uint8Array([1, 2, 3]);

const digest = ripemd160(input);

console.log(digest);
// Uint8Array(20)
```

`ripemd160()` is synchronous and always returns a 20-byte `Uint8Array`.

---

## Hashing text

RIPEMD-160 operates on bytes rather than strings.

Use `TextEncoder` when hashing UTF-8 text:

```js
import { ripemd160 } from "ripemd160-js";

const input = new TextEncoder().encode(
  "the quick brown fox jumps over the lazy dog",
);

const digest = ripemd160(input);
```

This keeps text encoding explicit and avoids ambiguity between UTF-8, UTF-16, Latin-1, or other encodings.

---

## Converting the digest to hex

The library intentionally returns raw bytes rather than imposing an output encoding.

```js
const hex = Array.from(digest, (byte) =>
  byte.toString(16).padStart(2, "0"),
).join("");

console.log(hex);
```

For:

```text
the quick brown fox jumps over the lazy dog
```

the RIPEMD-160 digest is:

```text
704f5bd0a04f44c1f8e5aced93c381db13f1af5b
```

---

## TypeScript

TypeScript declarations are included with the package.

```ts
import { ripemd160 } from "ripemd160-js";

const input: Uint8Array = new TextEncoder().encode("hello");

const digest: Uint8Array = ripemd160(input);
```

The API is deliberately small:

```ts
function ripemd160(input: Uint8Array): Uint8Array;
```

No additional types, classes, contexts, or platform abstractions are required.

---

## Browser

`ripemd160-js` uses standard JavaScript typed arrays and can be imported directly into modern browser applications:

```js
import { ripemd160 } from "ripemd160-js";

const data = new TextEncoder().encode("hello");

const digest = ripemd160(data);
```

There are no Node.js-specific runtime dependencies such as:

```text
Buffer
crypto
stream
process
```

and no polyfills are required by the RIPEMD-160 implementation itself.

---

## Node.js

The same API works natively in Node.js:

```js
import { ripemd160 } from "ripemd160-js";

const data = new TextEncoder().encode("hello");

const digest = ripemd160(data);
```

The package uses native ECMAScript modules:

```js
import { ripemd160 } from "ripemd160-js";
```

CommonJS `require()` is intentionally not provided.

---

## Why `Uint8Array`?

Cryptographic hash functions operate on bytes.

Earlier versions of `ripemd160-js` provided additional conversion behavior for strings and encoded output. The current API reduces the library to the underlying primitive:

```text
Uint8Array → RIPEMD-160 → Uint8Array(20)
```

This has several advantages:

- explicit input encoding
- predictable output
- smaller implementation
- simpler TypeScript types
- fewer platform-specific assumptions
- easier interoperability with binary protocols
- no implicit string conversion
- no dependency on Node.js `Buffer`

For text:

```js
new TextEncoder().encode("hello");
```

For hex or other output formats, encode the returned digest according to the requirements of your application.

---

## Minimal by design

`ripemd160-js` intentionally does one thing:

```text
RIPEMD-160
```

The implementation does not include:

- dependency trees
- stream abstractions
- `Buffer` compatibility layers
- string encoding helpers
- hex encoding helpers
- WebAssembly loaders
- Node.js crypto wrappers
- environment detection

This keeps the package at approximately **4 KB**, down from approximately **7 KB** in the previous implementation.

---

## Isomorphic

The implementation is based entirely on standard ECMAScript primitives including:

```text
Uint8Array
Int32Array
Array
Math
32-bit bitwise operations
```

As a result, the RIPEMD-160 implementation itself is environment-independent and suitable for environments that support standard JavaScript typed arrays.

---

## API

### `ripemd160(input)`

Calculates the RIPEMD-160 digest of a byte sequence.

#### Parameters

```ts
input: Uint8Array;
```

The bytes to hash.

#### Returns

```ts
Uint8Array;
```

A 20-byte RIPEMD-160 digest.

#### Example

```js
import { ripemd160 } from "ripemd160-js";

const digest = ripemd160(new Uint8Array([1, 2, 3, 4]));
```

---

## Development

Install development dependencies:

```sh
npm install
```

Build the TypeScript source:

```sh
npm run build
```

Run the test suite:

```sh
npm test
```

Format the project:

```sh
npm run prettier:fix
```

Check the contents that would be published to npm:

```sh
npm pack --dry-run
```

The TypeScript source lives under:

```text
src/
```

and is compiled into:

```text
dist/
```

Only the compiled distribution is included in the published npm package.

---

## Compatibility

`ripemd160-js` is intended for:

- Node.js
- browsers
- TypeScript
- JavaScript
- bundlers
- server-side runtimes
- client-side applications
- blockchain and protocol tooling

The distributed JavaScript uses native ECMAScript modules.

---

## RIPEMD-160 security note

RIPEMD-160 is an older cryptographic hash function.

This package exists primarily for compatibility with protocols and systems that specifically require RIPEMD-160, including various blockchain and cryptographic formats.

For new protocols where no compatibility requirement exists, prefer a modern cryptographic hash function appropriate to the security requirements of the application.

---

## License

MIT
