import { ROUTES } from "@/consts/router";
import { getName } from "@/utils/application";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  goToProjectUsersList,
  inviteNewProjectUser,
} from "cypress/support/utils/custodian/projects";
import { has6TabsCustodianUser } from "cypress/support/utils/custodian/users";

import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

describe("Projects custodians journey", () => {
  it("should have no detectable accessibility violations on load", () => {
    loginCustodian();
    cy.visitFirst(ROUTES.profileCustodianUsers.path);
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });
});

describe("Projects custodians journey", () => {
  before(() => {
    loginCustodian();
    goToProjectUsersList();
    inviteNewProjectUser(dataProjectInviteUser);
    cy.visitFirst(ROUTES.profileCustodianUsers.path);
    cy.waitForLoadingToFinish();
    cy.contains("button", "Switch to list view").click();
    cy.contains("a", getName(dataProjectInviteUser)).click();
  });

  after(() => {
    logout();
  });

  it("Has 6 Tabs Custodian User", () => {
    has6TabsCustodianUser(dataProjectInviteUser);
  });
});
