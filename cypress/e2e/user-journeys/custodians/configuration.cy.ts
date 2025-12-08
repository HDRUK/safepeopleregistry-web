import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { hasCheckedOnOrganisationConfigurationAutomatedFlags, hasCheckedOnUsersConfigurationAutomatedFlags, hasUnCheckedOnOrganisationConfigurationAutomatedFlags, hasUnCheckedOnUsersConfigurationAutomatedFlags } from "cypress/support/utils/custodian/configuration";

describe("Projects custodians journey", () => {
  beforeEach(() => {
    loginCustodian();
    cy.visitFirst(ROUTES.profileCustodianConfiguration.path);
  });

  after(() => {
    logout();
  });

  it("Has UnChecked On Users Configuration Automated Flags", () => {
    hasUnCheckedOnUsersConfigurationAutomatedFlags();
  });

  it("Has Checked On Users Configuration Automated Flags", () => {
    hasCheckedOnUsersConfigurationAutomatedFlags();
  });

  it("Has UnChecked On Users Configuration Automated Flags", () => {
    hasUnCheckedOnOrganisationConfigurationAutomatedFlags();
  });

  it("Has Checked On Users Configuration Automated Flags", () => {
    hasCheckedOnOrganisationConfigurationAutomatedFlags();
  });
});

