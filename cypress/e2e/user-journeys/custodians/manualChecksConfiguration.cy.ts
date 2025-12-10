import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { addManualChecksForOrganisationConfigurationManualChecks, 
         addManualChecksForUsersConfigurationManualChecks, 
         hasCheckedOnOrganisationConfigurationManualChecks, 
         hasCheckedOnUsersConfigurationManualChecks, 
         hasUnCheckedOnOrganisationConfigurationManualChecks, 
         hasUnCheckedOnUsersConfigurationManualChecks } 
from "cypress/support/utils/custodian/manualChecksConfiguration";

describe("Projects custodians journey", () => {
  beforeEach(() => {
    loginCustodian();
    cy.visitFirst(ROUTES.profileCustodianConfiguration.path);
  });

  after(() => {
    logout();
  });

  it("Has UnChecked On Users Configuration Manual Checks", () => {
    hasUnCheckedOnUsersConfigurationManualChecks();
  });

  it("Has Checked On Users Configuration Manual Checks", () => {
    hasCheckedOnUsersConfigurationManualChecks();
  });

  it("Add Manual Checks For Users Configuration Manual Checks", () => {
    addManualChecksForUsersConfigurationManualChecks();
  });

  it("Has UnChecked On Organisation Configuration Manual Checks", () => {
    hasUnCheckedOnOrganisationConfigurationManualChecks();
  });

  it("Has Checked On Organisation Configuration Manual Checks", () => {
    hasCheckedOnOrganisationConfigurationManualChecks();
  });

  it("Add Manual Checks For Users Configuration Manual Checks", () => {
    addManualChecksForOrganisationConfigurationManualChecks();
  });

});