import { ROUTES } from "@/consts/router";
import { InviteUserFormValues } from "@/types/form";

const dataCy = (value: string) => {
  return `[data-cy="${value}"]`;
};

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
  // cy.visit(ROUTES.homepage.path);
  cy.contains("button", "Sign Out").click({
    force: true,
  });
  cy.get("#kc-logout").should("be.visible").click();
};

const shouldBeUserProfile = () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/user/profile`);
};

const shouldBeOrganisationProfile = () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/organisation/profile`);
};

const shouldBeCustodianProfile = () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/data-custodian/profile`);
};

export {
  dataCy,
  logout,
  shouldBeUserProfile,
  shouldBeOrganisationProfile,
  shouldBeCustodianProfile,
  signout,
};
