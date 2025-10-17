import { faker } from "@faker-js/faker";
import { ROUTES } from "../../../src/consts/router";
import { injectParamsIntoPath } from "../../../src/utils/application";
import { DEFAULT_USER_ID } from "../../support/consts";
import { dataCy } from "../../support/utils/common";

const userAffiliationPath = injectParamsIntoPath(
  ROUTES.profileOrganisationUsersAffiliations.path,
  {
    userId: DEFAULT_USER_ID,
  }
);

const userEmail = faker.internet.email();

describe("Organisation affiliations", () => {
  beforeEach(() => {
    cy.login(
      Cypress.env("organisationEmail"),
      Cypress.env("organisationPassword")
    );
  });

  it("Approves an affiliation", () => {
    cy.visitFirst(userAffiliationPath);

    cy.buttonClick("Confirm affiliation");

    cy.swalClick("Close");

    cy.getResultsRow("first").within(() => {
      cy.contains("td", "Affiliated");
    });
  });

  it("Decline an affiliation", () => {
    cy.visitFirst(userAffiliationPath);

    cy.buttonClick("Decline affiliation");

    cy.swalClick("Close");

    cy.getResultsRow("first").within(() => {
      cy.contains("td", "Declined");
    });
  });

  it("Adds an affiliation", () => {
    cy.visitFirst(ROUTES.profileOrganisationUserAdministration.path);

    cy.buttonClick("Add another user");

    cy.get(dataCy("form-modal")).should("be.visible");

    cy.get("#first_name").clear().type("Anne");
    cy.get("#last_name").clear().type("Ackroyd");
    cy.get("#email").clear().type(userEmail);

    cy.saveFormClick("Invite");

    cy.getResultsRow().contains("td", userEmail);
  });

  it("Removes an affiliation and reloads the page", () => {
    cy.visitFirst(ROUTES.profileOrganisationUserAdministration.path);

    cy.getResultsActionMenu(userEmail).click();

    cy.actionMenuClick("Remove affiliation");

    cy.swalClick("Go ahead", "Delete");
    cy.swalClick("Close");

    cy.get("td").contains(userEmail).should("not.exist");
  });
});
