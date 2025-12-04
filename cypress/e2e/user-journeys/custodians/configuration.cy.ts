import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { 
  hasCheckedOnOrganisationConfiguration, 
  hasCheckedOnUsersConfiguration, 
  hasUnCheckedOnOrganisationConfiguration, 
  hasUnCheckedOnUsersConfiguration } from "cypress/support/utils/custodian/configuration";

describe("Projects custodians journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianConfiguration.path);
  });

  before(() => {
    loginCustodian();
  });

  after(() => {
    logout();
  });

    it("Has Checked On Users Configuration", () => {
        hasCheckedOnUsersConfiguration();
      });

    it("Has Checked On Users Configuration", () => {
      hasUnCheckedOnUsersConfiguration();
      });

    it("Has Checked On Users Configuration", () => {
      hasCheckedOnOrganisationConfiguration();
      });

    it("Has Checked On Users Configuration", () => {
      hasUnCheckedOnOrganisationConfiguration();
      });
});
