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
  cy.visit(ROUTES.homepage.path);
  cy.contains("button", "Sign Out").click();
};

const inviteNewUserForm = (invite: InviteUserFormValues) => {
  cy.get("#first_name").clear().type(invite.first_name);
  cy.get("#last_name").clear().type(invite.last_name);
  cy.get("#email").clear().type(invite.email);
  cy.selectValue("organisation_id", invite.organisation_id);

  cy.saveFormClick("Invite");
  cy.swalClick("Close");
};

const shouldBeUserProfile = () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/user/profile`);
};

const shouldBeOrganisationProfile = () => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/organisation/profile`);
};

export {
  dataCy,
  logout,
  inviteNewUserForm,
  shouldBeUserProfile,
  shouldBeOrganisationProfile,
  signout,
};
