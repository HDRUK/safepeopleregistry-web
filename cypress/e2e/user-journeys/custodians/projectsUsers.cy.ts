import { ROUTES } from "@/consts/router";
import { dataCy, logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  goToProjectUsersList,
  inviteNewProjectUser,
  removeFromProjectUsers,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

const { first_name, last_name } = dataProjectInviteUser;

describe("Projects users journey", () => {
  after(() => {
    logout();
  });

  before(() => {
    loginCustodian();

    goToProjectUsersList();

    inviteNewProjectUser(dataProjectInviteUser);
  });

  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianUsers.path);

    cy.buttonClick("Switch to list view");
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Cannot manually change from invited", () => {
    cy.get("tbody")
      .find("tr")
      .last()
      .find(dataCy("action-menu"))
      .last()
      .click();

    cy.get(".MuiPopover-root")
      .should("be.visible")
      .contains(/change status/i)
      .should("not.exist");
  });

  it("Shows the organisation validation status column for each project user", () => {
    cy.waitForLoadingToFinish();

    cy.get("tbody tr").then($rows => {
      if ($rows.length === 0) {
        cy.log("No project users in list — skipping column assertion");
        return;
      }

      cy.get("thead th").should("contain.text", "Organisation status");

      cy.get("tbody tr")
        .first()
        .find("td")
        .then($cells => {
          const hasStatusChip = $cells
            .toArray()
            .some(
              td =>
                Cypress.$(td).find(".MuiChip-root").length > 0 ||
                Cypress.$(td).find('[class*="Chip"]').length > 0
            );
          expect(hasStatusChip).to.be.true;
        });
    });
  });

  it("Removes a user from the project", () => {
    removeFromProjectUsers({ first_name, last_name });

    cy.contains(`${first_name} ${last_name}`).should("not.exist");
  });
});
