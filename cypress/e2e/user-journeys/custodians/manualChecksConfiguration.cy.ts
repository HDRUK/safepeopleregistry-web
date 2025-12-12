import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import { hasAddManualChecksForOrganisationConfigurationManualChecks, 
         hasAddManualChecksForUsersConfigurationManualChecks, 
         hasCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks, 
         hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks, 
         hasCheckedOnOrganisationConfigurationManualChecks, 
         hasCheckedOnUsersConfigurationManualChecks, 
         hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks, 
         hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks, 
         hasEditCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks, 
         hasEditCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks, 
         hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks, 
         hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks, 
         hasEditManualChecksForOrganisationConfigurationManualChecks, 
         hasEditManualChecksForUsersConfigurationManualChecks, 
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

  it("Has Add Manual Checks For Users Configuration Manual Checks", () => {
    hasAddManualChecksForUsersConfigurationManualChecks();
  });

  it("Has Cancel Button Takes Back To The Manaul Checks Page For Users Configuration Manual Checks", () => {
    hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks();
  });

  it("Has Close Icon Takes Back To The Manaul Checks Page For Users Configuration Manual Checks", () => {
    hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks();
  });

  it("Has Edit Manual Checks For Users Configuration Manual Checks", () => {
    hasEditManualChecksForUsersConfigurationManualChecks();
  });

  it("Has Edit Cancel Button Takes Back To The Manaul Checks Page For Users Configuration Manual Checks", () => {
    hasEditCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks();
  });

  it("Has Edit Close Icon Takes Back To The Manaul Checks Page For Users Configuration Manual Checks", () => {
    hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks();
  });
 
  it("Has UnChecked On Organisation Configuration Manual Checks", () => {
    hasUnCheckedOnOrganisationConfigurationManualChecks();
  });

  it("Has Checked On Organisation Configuration Manual Checks", () => {
    hasCheckedOnOrganisationConfigurationManualChecks();
  });

  it("Has Add Manual Checks For Users Configuration Manual Checks", () => {
    hasAddManualChecksForOrganisationConfigurationManualChecks();
  });

  it("Has Cancel Button Takes Back To The Manaul Checks Page For Organisation Configuration Manual Checks", () => {
    hasCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks();
  });

  it("Has Close Icon Takes Back To The Manaul Checks Page For Organisation Configuration Manual Checks", () => {
    hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks();
  });

  it("Has Edit Manual Checks For Organisation Configuration Manual Checks", () => {
    hasEditManualChecksForOrganisationConfigurationManualChecks();
  });

  it("Has Edit Cancel Button Takes Back To The Manaul Checks Page For Organisation Configuration Manual Checks", () => {
    hasEditCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks();
  });

  it("Has Edit Close Icon Takes Back To The Manaul Checks Page For Organisation Configuration Manual Checks", () => {
    hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks();
  });
});