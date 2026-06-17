import { faker } from "@faker-js/faker";

const hasUnCheckedOnUsersConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#13").should("exist").uncheck();
  cy.contains(
    "p",
    "Contact details tab: Location meets project & policy requirements"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#14").should("exist").uncheck();
  cy.contains(
    "p",
    "Projects tab: Previous sensitive data project with us in last 2 years at same affiliation?"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnUsersConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#13").should("exist").check();
  cy.get("#14").should("exist").check();
};

const addManualChecksForUsersConfigurationManualChecks = (title: string) => {
  cy.clickSubTab("Manual checks");
  cy.contains('[data-cy="skeleton-checkboxlist"]', { timeout: 20000 }).should(
    "not.exist"
  );
  cy.contains("button", "Add manual check")
    .should("be.visible")
    .and("not.be.disabled")
    .click();

  cy.get("#text", { timeout: 20000 })
    .should("exist")
    .should("be.visible")
    .and("not.be.disabled")
    .click()
    .clear()
    .type(title);
  cy.saveFormClick("Save");
};

const hasCancelButtonTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.clickSubTab("Manual checks");
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.clickSubTab("Manual checks");

    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });

    cy.contains("button", "Add manual check").click();

    cy.get('[data-testid="form-modal"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[aria-label="Close"] svg').closest("button").click();
      });

    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForUsersConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
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
    cy.clickSubTab("Manual checks");
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    cy.clickSubTab("Manual checks");

    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });

    cy.get('[data-cy="action-menu"]').eq(0).click();
    cy.contains('li[role="menuitem"]', "Edit").click();

    cy.get('[data-testid="form-modal"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[aria-label="Close"] svg').closest("button").click();
      });

    cy.contains("a", "Manual checks").should("exist");
  };

const hasUnCheckedOnOrganisationConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#19").should("exist").uncheck();
  cy.contains("span", "Contact details tab: Verify SRO identity").should(
    "exist"
  );
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#21").should("exist").uncheck();
  cy.contains(
    "p",
    "Digital identifiers tab: Check validity & type (Public, Private, etc.)"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnOrganisationConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#19").should("exist").check();
  cy.get("#21").should("exist").check();
};

const hasAddManualChecksForOrganisationConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
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
    cy.clickSubTab("Manual checks");
    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.clickSubTab("Manual checks");

    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });

    cy.contains("button", "Add manual check").click();

    cy.get('[data-testid="form-modal"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[aria-label="Close"] svg').closest("button").click();
      });

    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditManualChecksForOrganisationConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  const text = "Contact details tab: Verify SRO identity";
  cy.contains("p", "Contact details tab: Verify SRO identity")
    .closest("li")
    .find('[data-cy="action-menu"]')
    .should("exist")
    .click();
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
    cy.clickSubTab("Manual checks");
    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });
    cy.get('[data-cy="action-menu"]').eq(4).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    cy.clickSubTab("Manual checks");

    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });

    cy.get('[data-cy="action-menu"]').eq(4).click();
    cy.contains('li[role="menuitem"]', "Edit").click();

    cy.get('[data-testid="form-modal"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[aria-label="Close"] svg').closest("button").click();
      });

    cy.contains("a", "Manual checks").should("exist");
  };

const hasAddManualChecksForUsersConfigurationManualChecks = () => {
  cy.clickSubTab("Manual checks");
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
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
