import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;

      config.env.keycloakClientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

      config.env.keycloakClientSecret =
        process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET;

      config.env.keycloakRealm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;

      config.env.keycloakLoginRedirectUrl =
        process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGIN;

      config.env.userEmail = process.env.CYPRESS_USER_EMAIL;
      config.env.userPassword = process.env.CYPRESS_USER_PASSWORD;

      config.env.organisationEmail = process.env.CYPRESS_ORGANISATION_EMAIL;
      config.env.organisationPassword =
        process.env.CYPRESS_ORGANISATION_PASSWORD;

      config.env.custodianEmail = process.env.CYPRESS_CUSTODIAN_EMAIL;
      config.env.custodianPassword = process.env.CYPRESS_CUSTODIAN_PASSWORD;

      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    // supportFile: "cypress/support/index.ts",
  },
});
