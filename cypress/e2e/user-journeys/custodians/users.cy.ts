import { ROUTES } from "@/consts/router";
import { getName } from "@/utils/application";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  goToProjectUsersList,
  inviteNewProjectUser,
} from "cypress/support/utils/custodian/projects";
import {
  hasAffiliationsTabCustodianUser,
  hasAutomatedFlagsTabCustodianUser,
  hasHistoryTabCustodianUser,
  hasIdentityTabCustodianUser,
  hasProjectsTabCustodianUser,
  hasTrainingandAccreditationsTabCustodianUser,
} from "cypress/support/utils/custodian/users";

import { DEFAULT_PROJECT_INVITE_USERS } from "cypress/support/utils/data";

const dataProjectInviteUser = DEFAULT_PROJECT_INVITE_USERS;

describe("Projects custodians journey", () => {
  it('should have no detectable accessibility violations on load', () => {
      loginCustodian();
      cy.visitFirst(ROUTES.profileCustodianUsers.path);
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });
})


describe("Projects custodians journey", () => {
  // beforeEach(() => {
   

  //   cy.contains("a", getName(dataProjectInviteUser)).click();
  // });

  beforeEach(() => {
    loginCustodian();
    goToProjectUsersList();
    inviteNewProjectUser(dataProjectInviteUser);
  });

  after(() => {
    logout();
  });
  
  it("Has Affiliations Tab Custodian User", () => {
    hasAffiliationsTabCustodianUser();
  });

  it("Has Projects Tab Custodian User", () => {
    hasProjectsTabCustodianUser();
  });

  it("Has Identity Tab Custodian User", () => {
    hasIdentityTabCustodianUser(dataProjectInviteUser);
  });

  it("Has Training and Accreditations Tab Custodian User", () => {
    hasTrainingandAccreditationsTabCustodianUser();
  });

  it("Has Automated Flags Tab Custodian User", () => {
    hasAutomatedFlagsTabCustodianUser();
  });

  it("Has History Tab Custodian User", () => {
    hasHistoryTabCustodianUser();
  });
});
