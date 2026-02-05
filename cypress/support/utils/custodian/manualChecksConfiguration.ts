import { faker } from "@faker-js/faker";
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

const addManualChecksForUsersConfigurationManualChecks = (title: string) => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });

  cy.contains("button", "Add manual check").click();
  cy.get("#text").type(title);
  cy.saveFormClick("Save");
};

const hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForUsersConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
  const text = "Mandatory Custodian Training Testing";
  cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
  cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
  cy.contains("h3", "Edit User manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").clear().type(text);
  cy.saveFormClick("Save");
  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

const hasEditCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
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

const hasAddManualChecksForOrganisationConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
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
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForOrganisationConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
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
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
      cy.contains("a", "Manual checks").click();
    });
    cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.get('[data-testid="CloseIcon"]').should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasAddManualChecksForUsersConfigurationManualChecks = () => {
  cy.get(dataCy("sub-tabs-navigation")).within(() => {
    cy.contains("a", "Manual checks").click();
  });
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
