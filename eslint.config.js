const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");
const jsxA11Y = require("eslint-plugin-jsx-a11y");
const unusedImports = require("eslint-plugin-unused-imports");

const {
    fixupPluginRules,
    fixupConfigRules,
} = require("@eslint/compat");

const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },

        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
        },
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            node: {
                extensions: [".ts", ".tsx"],
            },
        },
    },

    plugins: {
        react,
        "react-hooks": fixupPluginRules(reactHooks),
        "@typescript-eslint": typescriptEslint,
        prettier,
        import: fixupPluginRules(_import),
        "jsx-a11y": jsxA11Y,
        "unused-imports": unusedImports,
    },

    extends: fixupConfigRules(compat.extends(
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "prettier",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
        "plugin:security/recommended-legacy",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended",
    )),

    rules: {
        "unused-imports/no-unused-imports": "error",
        "react/no-unstable-nested-components": "warn",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["off"],
        "security/detect-object-injection": "off",
        "@typescript-eslint/no-non-null-assertion": "off",

        "react/no-unknown-property": ["error", {
            ignore: ["css"],
        }],

        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": "off",
        "no-useless-computed-key": "off",
        "no-use-before-define": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-require-imports": "off",
        "import/no-cycle": "off",

        "react/jsx-filename-extension": [1, {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        }],

        "react/jsx-props-no-spreading": "off",

        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
        }],

        "jsx-a11y/anchor-is-valid": ["warn", {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
        }],

        camelcase: "off",
        "react/require-default-props": "off",
        "no-nested-ternary": "off",
        "import/prefer-default-export": "off",

        "react/function-component-definition": [2, {
            namedComponents: ["arrow-function", "function-declaration"],
            unnamedComponents: "arrow-function",
        }],

        "no-console": "off",
        "no-return-await": "off",
        "no-param-reassign": "off",

        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }, {
            usePrettierrc: true,
        }],

        "no-undef": "off",

        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],
    },
}, globalIgnores(["**/.next", "**/node_modules", "**/coverage"])]);
