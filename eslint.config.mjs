import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-plugin-prettier";
import nextTs from "eslint-config-next/typescript";

export default [
  ...nextTs,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "coverage/**",
      "scripts/**",
      "**/*.js",
    ],
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
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-object-type": "off",

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
  {
    files: [
      "cypress/**/*.ts",
      "**/*.d.ts",
      "*.config.ts",
      ".storybook/**/*.ts",
      "*.setup.tsx",
    ],
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
