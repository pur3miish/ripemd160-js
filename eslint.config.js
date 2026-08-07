import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import mochaPlugin from "eslint-plugin-mocha";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["test/**/*.js"],

    ...mochaPlugin.configs.recommended,

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
  },

  // Our test files intentionally use top-level it()
  {
    files: ["test/**/*.js"],

    rules: {
      "mocha/no-top-level-tests": "off",
      "mocha/no-global-tests": "off",
    },
  },
]);
