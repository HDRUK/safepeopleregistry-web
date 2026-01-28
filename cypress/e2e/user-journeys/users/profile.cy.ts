import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import {
  logout,
  shouldBeUserProfile,
  signout,
} from "cypress/support/utils/common";
import { EMAIL_UPDATE_ACCOUNT_LABEL } from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { loginUser } from "cypress/support/utils/user/auth";
import { changeEmail } from "cypress/support/utils/user/profile";

const newEmail = faker.internet.email().toLowerCase();

describe("Profile journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherIdentity.path);
  });

  after(() => {
    cy.visitFirst(ROUTES.profileResearcherIdentity.path);

    changeEmail(Cypress.env("userEmail"));

    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Updates the users email", () => {
    cy.get("#personal_email").should("have.attr", "disabled");

    changeEmail(newEmail);

    cy.reload();

    cy.get("#personal_email").should("have.value", newEmail);

    signout();
    cy.clearAllSessionStorage();

    actionMessage(EMAIL_UPDATE_ACCOUNT_LABEL, {
      to: newEmail,
    });

    cy.contains(/Click here to proceed/).click();

    loginUser(newEmail);

    cy.visit(ROUTES.profileResearcher.path);

    shouldBeUserProfile();
  });
});
