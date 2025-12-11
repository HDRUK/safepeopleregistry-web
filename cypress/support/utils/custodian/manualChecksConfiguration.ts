import { Button } from "@mui/material";
import { dataCy } from "../common";

const hasUnCheckedOnUsersConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.get("#1").should("exist").uncheck();
  cy.contains("p", "Mandatory training has been completed").should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#2").should("exist").uncheck();
  cy.contains("p", "The organisation has confirmed the user").should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnUsersConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.get("#1").should("exist").check();
  cy.get("#2").should("exist").check();
};

const addManualChecksForUsersConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.contains("button", "Add manual check").should("exist").click();
  cy.contains("h3", "Add User manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").should("exist").type("Mandatory Custodian Training");
  cy.saveFormClick("Save");
};

const hasUnCheckedOnOrganisationConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.get("#3").should("exist").uncheck();
  cy.contains("p", "Is the Organisation aligned with the SDE network?").should(
    "exist"
  );
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#4").should("exist").uncheck();
  cy.contains(
    "p",
    "Are we confident costs would be met and profits realised for future projects?"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnOrganisationConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.get("#3").should("exist").check();
  cy.get("#4").should("exist").check();
};

const addManualChecksForOrganisationConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  cy.get("#1").should("exist").check();
  cy.get("#2").should("exist").check();
};

export {
  hasUnCheckedOnUsersConfigurationManualChecks,
  hasCheckedOnUsersConfigurationManualChecks,
  addManualChecksForUsersConfigurationManualChecks,
  hasUnCheckedOnOrganisationConfigurationManualChecks,
  hasCheckedOnOrganisationConfigurationManualChecks,
  addManualChecksForOrganisationConfigurationManualChecks,
};
