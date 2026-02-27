import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedCustodianHasProjectUser } from "@/mocks/data/custodian";
import { getName } from "@/utils/application";
import { dataCy, logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  changeStatusProjectUsers,
  goToProjectUsersList,
  hasProjectUsers,
  inviteNewProjectUser,
  removeFromProjectUsers,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_PROJECT_USERS_CUSTODIANS,
} from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

const { first_name, last_name } = dataProjectInviteUser;

const dataProjectUser = mockedCustodianHasProjectUser({
  ...DEFAULT_PROJECT_USERS_CUSTODIANS,
  project_has_user: {
    ...DEFAULT_PROJECT_USERS_CUSTODIANS.project_has_user,
    registry: {
      user: {
        first_name,
        last_name,
      },
    },
  },
});

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

  it("Removes a user from the project", () => {
    removeFromProjectUsers({ first_name, last_name });

    cy.getResultsRow().should("not.exist");
  });
});
