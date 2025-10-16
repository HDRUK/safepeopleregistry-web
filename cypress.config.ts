import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.keycloakBaseUrl = process.env.CYPRESS_KEYCLOAK_BASE_URL;
      config.env.keycloakBaseLoginPath =
        process.env.CYPRESS_KEYCLOAK_BASE_LOGIN_PATH;
      config.env.userEmail = process.env.CYPRESS_USER_EMAIL;
      config.env.userPassword = process.env.CYPRESS_USER_PASSWORD;

      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
  },
});
