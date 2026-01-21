import { ROUTES } from "@/consts/router";
import { faker } from "@faker-js/faker";
import { getModalByHeader, logout } from "cypress/support/utils/common";
import { DEFAULT_USER } from "cypress/support/utils/data";
import { loginUser } from "cypress/support/utils/user/auth";
import { changeEmail } from "cypress/support/utils/user/profile";

const newEmail = faker.internet.email().toLowerCase();

describe("Profile journey", () => {
  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherIdentity.path);
  });

  after(() => {
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
  });
});
