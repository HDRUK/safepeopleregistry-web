import { ROUTES } from "@/consts/router";
import { getName } from "@/utils/application";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { checkMandatoryCustodianTrainingTestingChecksFailCancelButton, 
         checkMandatoryCustodianTrainingTestingChecksPassCancelButton,
         checkMandatoryCustodianTrainingTestingChecksPass,
         checkMandatoryCustodianTrainingTestingChecksPassChangeDecision,
         checkMandatoryCustodianTrainingTestingChecksPassViewLessViewAll,
         checkMandatoryCustodianTrainingTestingChecksFail,
         checkMandatoryCustodianTrainingTestingChecksFailChangeDecision,
         checkMandatoryCustodianTrainingTestingChecksFailViewLessViewAll,
         checkMandatoryCustodianTrainingTestingChecksAddMoreInformation,
         checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton,
 } from "cypress/support/utils/custodian/mandatoryChecksOnProjectUserPage";
import { hasAddManualChecksForUsersConfigurationManualChecks } from "cypress/support/utils/custodian/manualChecksConfiguration";
import {
  goToProjectUsersList,
  inviteNewProjectUser,
} from "cypress/support/utils/custodian/projects";

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
 beforeEach(() => {
    loginCustodian();
    cy.visitFirst(ROUTES.profileCustodianUsers.path);
    cy.contains("a", getName(dataProjectInviteUser)).click();
  });
  before(() => {
    loginCustodian();
    goToProjectUsersList();
    inviteNewProjectUser(dataProjectInviteUser);
    cy.visitFirst(ROUTES.profileCustodianConfiguration.path);
    hasAddManualChecksForUsersConfigurationManualChecks();
  });

  after(() => {
    logout();
  });

  it("Check Mandatory Custodian Training Testing Checks Add More Iformation Cancel Button", () => {
    checkMandatoryCustodianTrainingTestingChecksAddMoreIformationCancelButton();
  });

  it("Check Mandatory Custodian Training Testing Checks Add More Information", () => {
    checkMandatoryCustodianTrainingTestingChecksAddMoreInformation();
  });

  it("Check Mandatory Custodian Training Testing Checks Pass Cancel Button", () => {
    checkMandatoryCustodianTrainingTestingChecksPassCancelButton();
  });

  it("Check Mandatory Custodian Training Testing Checks Pass", () => {
    checkMandatoryCustodianTrainingTestingChecksPass();
  });

  it("Check Mandatory Custodian Training Testing Checks Pass Change Decision", () => {
    checkMandatoryCustodianTrainingTestingChecksPassChangeDecision();
  });

  it("Check Mandatory Custodian Training Testing Checks Pass ViewLess ViewAll", () => {
    checkMandatoryCustodianTrainingTestingChecksPassViewLessViewAll();
  });

  it("Check Mandatory Custodian Training Testing Checks Fail Cancel Button", () => {
    checkMandatoryCustodianTrainingTestingChecksFailCancelButton();
  });

  it("Check Mandatory Custodian Training Testing Checks Fail", () => {
    checkMandatoryCustodianTrainingTestingChecksFail();
  });

  it("Check Mandatory Custodian Training Testing Checks Fail Change Decision", () => {
    checkMandatoryCustodianTrainingTestingChecksFailChangeDecision();
  });

  it("Check Mandatory Custodian Training Testing Checks Fail ViewLess ViewAll", () => {
    checkMandatoryCustodianTrainingTestingChecksFailViewLessViewAll();
  });
});

