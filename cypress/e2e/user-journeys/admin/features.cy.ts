import { ROUTES } from "@/consts/router";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { logout } from "cypress/support/utils/common";
import {
  hasFeatureFlag,
  canToggleFeature,
} from "cypress/support/utils/admin/features";
import { DEFAULT_UNAPPROVED_ORGANISATION } from "cypress/support/utils/data";

const dataOrganisation = DEFAULT_UNAPPROVED_ORGANISATION;

describe("Feature Flag journey", () => {
  describe("Enable, Disable feature flags", () => {
    beforeEach(() => {
      loginAdmin();

      cy.visitFirst(ROUTES.profileAdmin.path);
    });

    after(() => {
      logout();
    });
    it("should have no detectable accessibility violations on load", () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });

    it("Has feature test-feature enabled", () => {
      hasFeatureFlag("test-feature", "true");
    });

    it("Can toggle test-feature", () => {
      canToggleFeature("test-feature", "true");
    });

    // it("Can make it christmas", () => {
    //   canToggleFeature('christmas-banner', 'false', true);
    //   cy.reload()
    //   cy.get('[data-testid="banner"]', { timeout: 10000 })
    //     .should('be.visible')
    // });
    
  });
});
