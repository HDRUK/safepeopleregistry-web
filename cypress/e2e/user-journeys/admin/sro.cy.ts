import { ROUTES } from "@/consts/router";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { validateSROOrganisations } from "cypress/support/utils/admin/sro";
import { dataCy, logout } from "cypress/support/utils/common";
import {
  DEFAULT_UNAPPROVED_ORGANISATION,
  DEFAULT_SRO_FIELDS_ORGANISATIONS,
} from "cypress/support/utils/data";
import { loginUnapprovedOrganisation } from "cypress/support/utils/organisation/auth";
import {
  addSROOrganisations,
  hasSRODisabledTabsOrganisations,
  hasSROEnabledTabsOrganisations,
  hasSROOrganisation,
} from "cypress/support/utils/organisation/sro";

const dataOrganisation = DEFAULT_UNAPPROVED_ORGANISATION;

describe("SRO journey", () => {
  before(() => {
    loginAdmin();
    cy.visitFirst(ROUTES.profileAdmin.path);
    cy.waitForLoadingToFinish();
    cy.contains("Feature Flags").click();
    cy.getResultsRowByValue("SroRequirementEnabled").then($row => {
      if ($row.text().includes("false")) {
        cy.getResultsActionMenu("SroRequirementEnabled").click();
        cy.actionMenuClick("Enable");
        cy.get(dataCy("results"))
          .contains("tr", "SroRequirementEnabled")
          .should("contain.text", "true");
      }
    });
    logout();
  });

  describe("Organisation not approved", () => {
    beforeEach(() => {
      loginUnapprovedOrganisation();
      cy.visitFirst(ROUTES.profileOrganisationDetailsSro.path);
    });

    after(() => {
      logout();
    });
    it("should have no detectable accessibility violations on load", () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });
    it("Has the correct tabs disabled", () => {
      hasSRODisabledTabsOrganisations();
    });

    it("Adds SRO info", () => {
      addSROOrganisations(DEFAULT_SRO_FIELDS_ORGANISATIONS);
    });
  });

  describe("Admin", () => {
    beforeEach(() => {
      loginAdmin();

      cy.visitFirst(ROUTES.profileAdmin.path);
    });

    it("Approves an organisation", () => {
      validateSROOrganisations(dataOrganisation, "Approve");

      hasSROOrganisation(dataOrganisation, "Approved");
    });

    /**
     * Temporarily disabled, unapproving has not been considered and has
     * lots of implications so the option is disabled
     */
    // it("Unapproves an organisation", () => {
    //   validateSROOrganisations(dataOrganisation, "Unapprove");

    //   hasSROOrganisation(dataOrganisation, "Not approved");
    // });
  });

  describe("Organisation approved", () => {
    beforeEach(() => {
      loginUnapprovedOrganisation();

      cy.visitFirst(ROUTES.profileOrganisationDetailsSro.path);
    });

    after(() => {
      logout();
    });

    it("Has the correct tabs enabled", () => {
      hasSROEnabledTabsOrganisations();
    });
  });
});
