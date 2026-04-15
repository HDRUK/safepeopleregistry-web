const nextJest = require("next/jest");

process.env.TZ = "UTC";

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_KEYCLOAK_REALM: "my-realm",
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: "my-client-id",
  NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET: "my-client-secret",
  NEXT_PUBLIC_KEYCLOAK_BASE_URL: "https://example.com",
  NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGIN: "https://example.com/login-callback",
  NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGOUT:
    "https://example.com/logout-callback",
});

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testEnvironment: "jsdom",
  verbose: false,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/mocks/(.*)$": "<rootDir>/mocks/$1",
    "^@/queries/(.*)$": "<rootDir>/src/queries/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/images/(.*)$": "<rootDir>/src/images/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/consts/(.*)$": "<rootDir>/src/consts/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/organisms/(.*)$": "<rootDir>/src/organisms/$1",
    "^@/providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@/data/(.*)$": "<rootDir>/src/data/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
    "^@/i18n/(.*)$": "<rootDir>/src/i18n/$1",
    "\\.md$": "<rootDir>/mocks/markdownFileMock.js",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!pretty-bytes)/"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
    "<rootDir>/src/utils/testUtils.tsx",
    "<rootDir>/src/consts",
    "<rootDir>/src/config",
    "<rootDir>/src/services",
    "<rootDir>/src/i18n",
    "<rootDir>/src/recipes",
    "<rootDir>/src/services",
    "<rootDir>/src/types",
    "<rootDir>/src/pages",
    ".*mockData\\.ts(x)$",
    ".*\\.styles\\.ts$",
    "index.ts$",
    ".*\\.d\\.ts$",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
    "<rootDir>/src/utils/testUtils.tsx",
    "<rootDir>/src/consts",
    "<rootDir>/src/config",
    "<rootDir>/src/services",
    "<rootDir>/src/i18n",
    "<rootDir>/src/recipes",
    "<rootDir>/src/services",
    "<rootDir>/src/types",
    "<rootDir>/src/pages",
    ".*mockData\\.ts(x)$",
    ".*\\.styles\\.ts$",
    "index.ts$",
    ".*\\.d\\.ts$",
  ],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(customJestConfig);
