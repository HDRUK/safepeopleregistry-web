import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

// Run order, and the CI shard each spec runs in. CI runs each shard in its
// own job against a freshly seeded stack, so specs that depend on state left
// behind by another spec must share its shard (a shard keeps this order).
// Locally, with E2E_SHARD unset, everything runs in this order.
//  1 - SRO-disabled specs, admin and custodian configuration
//  2 - admin/sro approves the test Organisation (shared with the unapproved
//      Organisation login), which unlocks its Users and Projects tabs, and
//      custodians/projects creates "Test project", which goToProjectUsersList()
//      opens by default
//  3 - User journeys, plus Organisation pages that don't need SRO approval
//  4 - Invite and registration journeys
const SPECS: [spec: string, shard: number][] = [
  // First in the run: each toggles SroRequirementEnabled off and restores
  // it afterwards, and they need identities that later specs leave in a
  // changed state. Self-contained - they create whatever data they need.
  ["features/sroDisabledUserAffiliation.cy.ts", 1],
  ["features/sroDisabledCustodianSponsor.cy.ts", 1],
  ["features/sroDisabledCustodianUserInvite.cy.ts", 1],
  ["features/sroDisabledSuperadminInvite.cy.ts", 1],
  ["admin/features.cy.ts", 1],
  ["admin/users.cy.ts", 1],
  ["admin/sro.cy.ts", 2],
  ["admin/emails.cy.ts", 1],
  ["users/affiliations.cy.ts", 3],
  ["organisations/delegates.cy.ts", 3],
  ["organisations/affiliations.cy.ts", 2],
  ["organisations/projects.cy.ts", 2],
  ["custodians/projects.cy.ts", 2],
  ["custodians/projectsSafePeople.cy.ts", 2],
  ["custodians/projectsOrganisations.cy.ts", 2],
  ["custodians/projectsUsers.cy.ts", 2],
  ["custodians/team.cy.ts", 3],
  ["custodians/users.cy.ts", 2],
  ["custodians/configuration.cy.ts", 1],
  ["auth/redirects.cy.ts", 3],
  ["custodians/mandatoryChecksOnProjectUserPage.cy.ts", 2],
  ["custodians/manualChecksConfiguration.cy.ts", 1],
  ["users/projects.cy.ts", 3],

  ["users/training.cy.ts", 3],
  ["users/professionalRegistrations.cy.ts", 3],
  ["users/notifications.cy.ts", 3],
  ["organisations/subsidiaries.cy.ts", 3],
  ["custodians/webhooks.cy.ts", 3],

  ["admin/inviteCustodian.cy.ts", 4],
  ["admin/inviteOrganisation.cy.ts", 4],
  ["admin/inviteUser.cy.ts", 4],
  ["registration/registerUser.cy.ts", 4],
  ["registration/registerOrganisation.cy.ts", 4],
  ["registration/registerCustodian.cy.ts", 4],
  // Must stay last. It signs out (clearing every cached session) and changes
  // the test user's login email, submitting the revert without confirming
  // it, so any loginUser() in a later spec fails to authenticate.
  ["users/profile.cy.ts", 3],
];

const shard = Number(process.env.E2E_SHARD) || undefined;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // on('window:before:load', (win)=>{

      //  Object.defineProperty(win.navigator, 'maxTouchPoints', {
      //     configurable: true,
      //     value: 0
      //   });
      // })
      (on("before:browser:launch", (browser, launchOptions) => {
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
          },
        }));

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
    video: false,
    videosFolder: "cypress/videos",
    specPattern: SPECS.filter(
      ([, specShard]) => !shard || specShard === shard
    ).map(([spec]) => `cypress/e2e/user-journeys/${spec}`),
    // supportFile: "cypress/support/index.ts",
  },
});
