# Changelog

All notable changes to `ripemd160-js` are documented in this file.

## 4.0.0 - 2026-08-07

### Major

This release substantially simplifies `ripemd160-js`, replacing the previous implementation with a minimal TypeScript implementation focused on a single RIPEMD-160 primitive.

### Breaking Changes

- The public API is now byte-oriented:

  ```ts
  ripemd160(input: Uint8Array): Uint8Array
  ```

- String inputs are no longer implicitly encoded.

- Hex strings are no longer returned automatically for string inputs.

- The function is now synchronous.

- The previous Promise-based API has been removed.

- The previous default export has been replaced with a named export:

  ```js
  import { ripemd160 } from "ripemd160-js";
  ```

- CommonJS `require()` support is no longer provided.

- The package is now distributed as native ESM only.

### Added

- Native TypeScript source.
- Automatically generated TypeScript declaration files.
- Explicit `Uint8Array` input and `Uint8Array` output.
- Runtime validation for invalid input types.
- Native package-level ESM exports.
- Direct package import support:

  ```js
  import { ripemd160 } from "ripemd160-js";
  ```

### Changed

- Replaced the previous WebAssembly-based implementation with a standalone JavaScript RIPEMD-160 implementation.
- Reduced the published package footprint from approximately **7 KB to approximately 2 KB**.
- Simplified the public API to expose the underlying RIPEMD-160 byte primitive directly.
- Text encoding is now explicitly controlled by the caller using APIs such as `TextEncoder`.
- Digest encoding, including hexadecimal output, is now explicitly controlled by the caller.
- Source code is compiled from `src/index.ts` into the published `dist` directory.
- Only compiled distribution files are included in the npm package.
- Modernized the TypeScript build configuration.
- Modernized ESLint configuration to use ESLint flat config.
- Updated ESLint, eslint-plugin-mocha, Prettier, TypeScript, and other development tooling.
- Updated the minimum supported Node.js version to Node.js 22.

### Removed

- WebAssembly runtime implementation.
- WebAssembly binary payload.
- Implicit string conversion.
- Promise-based hashing API.
- Default export.
- CommonJS output.
- Node.js `Buffer` dependency from the runtime implementation.
- Platform-specific crypto dependencies.
- Legacy JavaScript project configuration.
- Hand-maintained TypeScript declaration files.

### Package Characteristics

- Zero runtime dependencies.
- Approximately 2 KB published package footprint.
- Native ESM.
- TypeScript declarations included.
- Browser compatible.
- Node.js compatible.
- Isomorphic implementation.
- No `Buffer` requirement.
- No WebAssembly runtime requirement.
- No Node.js `crypto` dependency.

---

## 3.0.3

### Fixed

- Added the missing TypeScript declaration file.
- Fixed package exports.

### Changed

- Improved Mocha test coverage.

---

## 3.0.1

### Fixed

- Fixed the missing `index.d.ts` file referenced by package exports.

---

## 3.0.0

### Major

- Added TypeScript declaration files (`.d.ts`) for public modules.
- Added support for Node.js 14 and newer.
- Added support for npm 7 and newer.
- Simplified package imports.
- Refined the package `exports` field so consumers no longer needed to specify implementation-specific `.mjs` or `.js` paths.

---

## 2.0.3

### Changed

- Updated README documentation.

---

## 2.0.2

### Changed

- Removed the JSON binary file to improve portability across Deno, Node.js, and browser environments.

---

## 2.0.1

### Fixed

- Fixed package import structure.

---

## 2.0.0

### Major

- Migrated the package to ECMAScript modules.
- Added Deno support.

### Changed

- Updated ESLint development dependencies and configuration.

---

## 1.2.0

### Added

- Improved package import support.

### Changed

- Updated development dependencies.
- Removed unnecessary development dependencies.

---

## 1.1.1

### Changed

- Updated README documentation.

---

## 1.1.0

### Added

- Added support for hashing arrays and strings up to 65,536 bytes.
- Added GitHub Actions workflow configuration.
- Added CI and npm version badges to the README.

---

## 1.0.1

### Fixed

- Corrected README documentation typos.

---

## 1.0.0

### Changed

- Reduced the embedded binary size using the Clang `-Oz` optimization flag.

---

## 1.0.0-rc

Initial release.
