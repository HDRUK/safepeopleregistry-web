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

describe("Projects organisations journey AXE", () => {
  it("should have no detectable accessibility violations on load", () => {
    loginCustodian();
    goToProjectUsersList();

    cy.waitForLoadingToFinish();
    cy.wait(2000);
    cy.checkA11yPage();
  });
});

describe("Projects organisations journey", () => {
  before(() => {
    loginCustodian();

    goToProjectUsersList();

    inviteNewProjectUser(dataProjectInviteUser);
  });

  after(() => {
    const { first_name, last_name } = dataProjectInviteUser;
    removeFromProjectUsers({ first_name, last_name });

    logout();
  });

  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianOrganisations.path);

    cy.contains("button", "Switch to list view").click();

    goToProjectUsersList();
  });

  it("Cannot change the status of an organisation", () => {
    cy.get("tbody")
      .find("tr")
      .last()
      .find(dataCy("action-menu"))
      .last()
      .click();

    cy.get(".MuiPopover-root").should("not.exist");
  });
});
