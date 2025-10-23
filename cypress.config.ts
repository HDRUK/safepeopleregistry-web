import { defineConfig } from "cypress";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message + "\n\n");

          return null;
        },
      });

      // on("before:run", () => {
      //   exec("./scripts/cypress.backup.sh");
      // });

      // on("after:run", () => {
      //   exec("./scripts/cypress.restore.sh");
      // });

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

      config.env.unapprovedOrganisationEmail =
        process.env.CYPRESS_UNAPPROVED_ORGANISATION_EMAIL;
      config.env.unapprovedOrganisationPassword =
        process.env.CYPRESS_UNAPPROVED_ORGANISATION_PASSWORD;

      config.env.custodianEmail = process.env.CYPRESS_CUSTODIAN_EMAIL;
      config.env.custodianPassword = process.env.CYPRESS_CUSTODIAN_PASSWORD;

      config.env.adminEmail = process.env.CYPRESS_ADMIN_EMAIL;
      config.env.adminPassword = process.env.CYPRESS_ADMIN_PASSWORD;

      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
    experimentalOriginDependencies: true,
    experimentalMemoryManagement: true,
    experimentalInteractiveRunEvents: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    // supportFile: "cypress/support/index.ts",
  },
});
