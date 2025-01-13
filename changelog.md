# ripemd160-js changelog

# 3.0.3

## Patch

- added .ts declaration file.
- Fixed exports issue.

## Patch

- Mocha testing

# 3.0.1

## Patch

- Added fix to the missing index.d.ts file from exports.

# 3.0.0

## Major

- TypeScript declaration files (.d.ts) have been added for all public modules.
- Support for node >=14.0.0 & npm >=7.0.0.
- Imports now favours dropping the file extension.
- Refined exports Field: Simplified the module exports by removing the .mjs and .js extensions from the paths. Now, users can import modules without needing to specify the file extension.

# 2.0.3

## Patch

- Redme updates

# 2.0.2

## Patch

- Removed JSON file for better support for universal cross platform (deno, nodejs and browser support).

# 2.0.1

## Patch

- Bug fix for import structure.

# 2.0.0

## Major

- This package is now an ESM module
- Support for Deno

## Patch

- dev eslint packages changes

# 1.2.0

## Minor

- Imports are now working.

## Patch

- Depen updated.
- Removed dev dependencies.

# 1.1.1

## Patch

- readme.md updates.

# 1.1.0

### Minor

- Hash function can now handle arrays & strings of up to 65,536.

### Patch

- Added github workflow configuration and badge to readme.md..
- Added npm version badge to readme.md.

## 1.0.1

### Patch

- typo fix in readme.md.

## 1.0.0

- Reduction in JSON binary file size by using clang flag -Oz.

## 1.0.0-rc

Initial Release.
