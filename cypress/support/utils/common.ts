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

  // A real logout revokes the session server-side, but leaves any
  // cacheAcrossSpecs cy.session cookies in place — clear them so the
  // next cy.login() for this identity re-authenticates for real
  // instead of restoring now-dead cookies.
  Cypress.session.clearAllSavedSessions();
};

const shouldBeUserProfile = () => {
  cy.contains("Add your personal details").should("exist");
};

const shouldBeOrganisationProfile = () => {
  cy.contains("Complete your Organisation name & address").should("exist");
};

const shouldBeCustodianProfile = () => {
  cy.contains("Complete your configuration").should("exist");
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
