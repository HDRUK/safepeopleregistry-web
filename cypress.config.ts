import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // on('window:before:load', (win)=>{

      //  Object.defineProperty(win.navigator, 'maxTouchPoints', {
      //     configurable: true,
      //     value: 0
      //   });
      // })
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium") {
          // running headless chrome in a virtualized environment forces pointer type to default to `NONE`
          // to mimic "desktop" environment more correctly we force blink to have `pointer: fine` support
          // this allows correct pickers behavior.
          // This impact the used DateTimePicker in Material UI (MUI) between DesktopDateTimePicker and MobileDateTimePicker
          launchOptions.args.push(
            "--disable-touch-events",
            "--blink-settings=primaryPointerType=4"
          );
        }

        return launchOptions;
      }),
      
        on("task", {
          log(message) {
            console.log(message + "\n\n");

            return true;
          },
           table(data) {
            console.table(data);
            return null;
          }
        });

      config.env.MAILDEV_PROTOCOL = process.env.CYPRESS_MAILDEV_PROTOCOL;
      config.env.MAILDEV_HOST = process.env.CYPRESS_MAILDEV_HOST;
      config.env.MAILDEV_SMTP_PORT = process.env.CYPRESS_MAILDEV_SMTP_PORT;
      config.env.MAILDEV_API_PORT = process.env.CYPRESS_MAILDEV_API_PORT;

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
    defaultCommandTimeout: 40000,
    projectId: "vnpz3g",
    viewportWidth: 1920,
    viewportHeight: 1080,
    numTestsKeptInMemory: 20,
    video: true,
    videosFolder: "cypress/videos",
    specPattern: [
      "cypress/e2e/user-journeys/admin/features.cy.ts",
      "cypress/e2e/user-journeys/admin/users.cy.ts",
      "cypress/e2e/user-journeys/admin/sro.cy.ts",
      "cypress/e2e/user-journeys/users/affiliations.cy.ts",
      "cypress/e2e/user-journeys/organisations/delegates.cy.ts",
      "cypress/e2e/user-journeys/organisations/affiliations.cy.ts",
      "cypress/e2e/user-journeys/custodians/projects.cy.ts",
      "cypress/e2e/user-journeys/custodians/projectsSafePeople.cy.ts",
      "cypress/e2e/user-journeys/custodians/projectsOrganisations.cy.ts",
      "cypress/e2e/user-journeys/custodians/projectsUsers.cy.ts",
      "cypress/e2e/user-journeys/custodians/team.cy.ts",
      "cypress/e2e/user-journeys/custodians/users.cy.ts",
      "cypress/e2e/user-journeys/custodians/configuration.cy.ts",
      // "cypress/e2e/user-journeys/admin/inviteCustodian.cy.ts",
      // "cypress/e2e/user-journeys/admin/inviteOrganisation.cy.ts",
      // "cypress/e2e/user-journeys/admin/inviteUser.cy.ts",
      // "cypress/e2e/user-journeys/registration/registerUser.cy.ts",
      // "cypress/e2e/user-journeys/registration/registerOrganisation.cy.ts",
      // "cypress/e2e/user-journeys/registration/registerCustodian.cy.ts",
    ],

    // supportFile: "cypress/support/index.ts",
  },
});
