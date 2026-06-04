import { ROUTES } from "@/consts/router";

const dataCy = (value: string) => {
  return `[data-cy="${value}"]`;
};

function getModalByHeader(header: string) {
  return cy
    .get('div[role="presentation"]')
    .filter(`:has(div:contains("${header}"))`)
    .first();
}

const logout = () => {
  /* Yet to fix */
  // Cypress.session.clearAllSavedSessions();
  // cy.contains("button", "Sign Out").click();
  // .then(() => {
  //   cy.origin(Cypress.env("keycloakBaseUrl"), { args: null }, () => {
  //     const { getKeycloakLogoutPath } = Cypress.require("./auth");
  //     cy.visit(getKeycloakLogoutPath());
  //     cy.get("#kc-logout").click();
  //   });
  // });
  //   cy.origin(Cypress.env("keycloakBaseUrl"), { args: null }, () => {
  //     const { getKeycloakLogoutPath } = Cypress.require("./auth");
  //     cy.visit(getKeycloakLogoutPath());
  //     cy.get("#kc-logout").click();
  //   });
};

const signout = () => {
  cy.visit(ROUTES.homepage.path);
  cy.contains("button", "Sign Out").click();

  cy.get("#kc-logout").if().click();
};

const PROFILE_REDIRECT_TIMEOUT = 120_000; // BE can be slow to process registration

const shouldBeUserProfile = () => {
  cy.url({ timeout: PROFILE_REDIRECT_TIMEOUT }).should(
    "include",
    "/user/profile"
  );
  cy.waitForLoadingToFinish();
  cy.reload();
  cy.waitForLoadingToFinish();
  cy.contains("Add your personal details", {
    timeout: PROFILE_REDIRECT_TIMEOUT,
  }).should("exist");
};

const shouldBeOrganisationProfile = () => {
  cy.url({ timeout: PROFILE_REDIRECT_TIMEOUT }).should(
    "include",
    "/organisation/profile"
  );
  cy.waitForLoadingToFinish();
  cy.reload();
  cy.waitForLoadingToFinish();
  cy.contains("Complete your Organisation name & address", {
    timeout: PROFILE_REDIRECT_TIMEOUT,
  }).should("exist");
};

const shouldBeCustodianProfile = () => {
  cy.url({ timeout: PROFILE_REDIRECT_TIMEOUT }).should(
    "include",
    "/data-custodian/profile"
  );
  cy.waitForLoadingToFinish();
  cy.reload();
  cy.waitForLoadingToFinish();
  cy.contains("Complete your configuration", {
    timeout: PROFILE_REDIRECT_TIMEOUT,
  }).should("exist");
};

export {
  dataCy,
  getModalByHeader,
  logout,
  shouldBeCustodianProfile,
  shouldBeOrganisationProfile,
  shouldBeUserProfile,
  signout,
};
