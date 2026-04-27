import { faker } from "@faker-js/faker";

const hasUnCheckedOnUsersConfigurationManualChecks = () => {
  cy.get("#1").should("exist").uncheck();
  cy.contains("span", "Mandatory training has been completed").should("exist");
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
  cy.get("#1").should("exist").check();
  cy.get("#2").should("exist").check();
};

const addManualChecksForUsersConfigurationManualChecks = (title: string) => {
  cy.contains("button", "Add manual check").click();
  cy.get("#text").type(title);
  cy.saveFormClick("Save");
};

const hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.contains("button", "Add manual check").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForUsersConfigurationManualChecks = () => {
  const text = "Mandatory Custodian Training Testing";
  cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
  cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
  cy.contains("h3", "Edit User manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").clear().type(text);
  // cy.get("#text").click().type("{selectall}{backspace}").type(text);
  cy.saveFormClick("Save");
  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

const hasEditCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasUnCheckedOnOrganisationConfigurationManualChecks = () => {
  cy.get("#3").should("exist").uncheck();
  cy.contains(
    "span",
    "Is the Organisation aligned with the SDE network?"
  ).should("exist");
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
  cy.get("#3").should("exist").check();
  cy.get("#4").should("exist").check();
};

const hasAddManualChecksForOrganisationConfigurationManualChecks = () => {
  const text = "Mandatory Custodian Training";
  cy.contains("h6", "Organisation")
    .parent()
    .within(() => {
      cy.contains("button", "Add manual check").click();
    });
  cy.contains("h3", "Add User manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").type(text);
  cy.saveFormClick("Save");
  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

const hasCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.contains("button", "Add manual check").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForOrganisationConfigurationManualChecks = () => {
  const text = "Is the Organisation aligned with the SDE network? Testing";
  cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
  cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
  cy.contains("h3", "Edit Organisation manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").clear().type(text);
  cy.saveFormClick("Save");
  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

const hasEditCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasAddManualChecksForUsersConfigurationManualChecks = () => {
  const text = faker.string.sample(20);

  cy.contains("button", "Add manual check").should("exist").click();
  cy.contains("h3", "Add User manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");

  cy.get("#text").type(text);

  cy.saveFormClick("Save");

  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

export {
  hasUnCheckedOnUsersConfigurationManualChecks,
  hasCheckedOnUsersConfigurationManualChecks,
  addManualChecksForUsersConfigurationManualChecks,
  hasAddManualChecksForUsersConfigurationManualChecks,
  hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks,
  hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks,
  hasEditManualChecksForUsersConfigurationManualChecks,
  hasEditCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks,
  hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks,
  hasUnCheckedOnOrganisationConfigurationManualChecks,
  hasCheckedOnOrganisationConfigurationManualChecks,
  hasAddManualChecksForOrganisationConfigurationManualChecks,
  hasCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks,
  hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks,
  hasEditManualChecksForOrganisationConfigurationManualChecks,
  hasEditCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks,
  hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks,
};
