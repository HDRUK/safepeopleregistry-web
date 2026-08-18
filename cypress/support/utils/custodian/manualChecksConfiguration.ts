import { faker } from "@faker-js/faker";

// Navigates like cy.clickSubTab, but skips its generic waitForLoadingToFinish
// (spinner polling + 1s network-idle wait) in favour of letting each caller's
// own specific assertion (skeleton gone, button visible, etc.) gate progress.
const goToManualChecksTab = () => {
  cy.contains('[data-cy="sub-tabs-navigation"] a', "Manual checks")
    .should("be.visible")
    .invoke("attr", "href")
    .then(href => cy.visitFirst((href as string).replace(/^\/[a-z-]+\//, "/")));
};

const hasUnCheckedOnUsersConfigurationManualChecks = () => {
  goToManualChecksTab();
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#37").should("exist").uncheck();
  cy.contains(
    "p",
    "Contact details tab: Location meets project & policy requirements"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#38").should("exist").uncheck();
  cy.contains(
    "p",
    "Projects tab: Previous sensitive data project with us in last 2 years at same affiliation?"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnUsersConfigurationManualChecks = () => {
  goToManualChecksTab();
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#37").should("exist").check();
  cy.get("#38").should("exist").check();
};

const addManualChecksForUsersConfigurationManualChecks = (title: string) => {
  goToManualChecksTab();
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
    goToManualChecksTab();
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    goToManualChecksTab();

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
  goToManualChecksTab();
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
    goToManualChecksTab();
    cy.get('[data-cy="action-menu"]').eq(0).should("exist").click();
    cy.contains('li[role="menuitem"]', "Edit").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasEditCloseIconTakesBackToTheManaulChecksPageForUsersConfigurationManualChecks =
  () => {
    goToManualChecksTab();

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
  goToManualChecksTab();
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#43").should("exist").uncheck();
  cy.contains("span", "Contact details tab: Verify SRO identity").should(
    "exist"
  );
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
  cy.get("#45").should("exist").uncheck();
  cy.contains(
    "p",
    "Digital identifiers tab: Check validity & type (Public, Private, etc.)"
  ).should("exist");
  cy.get('[data-cy="action-menu"]')
    .find('button[type="button"]')
    .should("exist");
};

const hasCheckedOnOrganisationConfigurationManualChecks = () => {
  goToManualChecksTab();
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  cy.get("#43").should("exist").check();
  cy.get("#45").should("exist").check();
};

const hasAddManualChecksForOrganisationConfigurationManualChecks = () => {
  goToManualChecksTab();
  cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
    timeout: 20000,
  });
  const text = "Mandatory Custodian Training";
  cy.contains("h6", "Organisation")
    .parent()
    .within(() => {
      cy.contains("button", "Add manual check").click();
    });
  cy.contains("h3", "Add Organisation manual check").should("exist");
  cy.contains("label", "Description").should("exist");
  cy.contains("button", "Cancel").should("exist");
  cy.get("#text").type(text);
  cy.saveFormClick("Save");
  cy.contains(text).should("exist");
  cy.contains("a", "Manual checks").should("exist");
};

const hasCancelButtonTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    goToManualChecksTab();
    cy.get('[data-cy="skeleton-checkboxlist"]').should("not.exist", {
      timeout: 20000,
    });
    cy.contains("button", "Add manual check").should("exist").click();
    cy.contains("button", "Cancel").should("exist").click();
    cy.contains("a", "Manual checks").should("exist");
  };

const hasCloseIconTakesBackToTheManaulChecksPageForOrganisationConfigurationManualChecks =
  () => {
    goToManualChecksTab();

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
  goToManualChecksTab();
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
    goToManualChecksTab();
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
    goToManualChecksTab();

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
  goToManualChecksTab();
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
