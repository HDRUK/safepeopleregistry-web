import next from "eslint-config-next";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";

export default [
  ...next(),

  {
    ignores: ["node_modules/**", ".next/**", "coverage/**"],
  },

  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },

    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      prettier,
    },

    rules: {
      "unused-imports/no-unused-imports": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "off",

      "react/no-unstable-nested-components": "warn",

      "no-console": "off",
      "no-param-reassign": "off",
      "no-nested-ternary": "off",

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
];
