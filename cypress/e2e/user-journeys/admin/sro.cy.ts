import { ROUTES } from "@/consts/router";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { validateSROOrganisatons } from "cypress/support/utils/admin/sro";
import { logout } from "cypress/support/utils/common";
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
  describe("Organisation not approved", () => {
    beforeEach(() => {
      loginUnapprovedOrganisation();

      cy.visitFirst(ROUTES.profileOrganisationDetailsNameAndAddress.path);
    });

    after(() => {
      logout();
    });

    // it("Has the correct tabs disabled", () => {
    //   hasSRODisabledTabsOrganisations(); -----<<< clean data journey
    // });

    it("Adds SRO info", () => {
      addSROOrganisations(DEFAULT_SRO_FIELDS_ORGANISATIONS);
    });
  });

  // describe("Admin", () => {
  //   beforeEach(() => {
  //     loginAdmin();

  //     cy.visitFirst(ROUTES.profileAdmin.path);
  //   });

  //   it("Approves an organisation", () => {
  //     validateSROOrganisatons(dataOrganisation, "Approve");

  //     hasSROOrganisation(dataOrganisation, "Approved");
  //   });

  //     /**
  //      * Temporarily disabled, unapproving has not been considered and has
  //      * lots of implications so the option is disabled
  //      */
  //     // it("Unapproves an organisation", () => {
  //     //   validateSROOrganisatons(dataOrganisation, "Unapprove");

  //     //   hasSROOrganisation(dataOrganisation, "Not approved");
  //     // });
  // });

  describe("Organisation approved", () => {
    beforeEach(() => {
      loginUnapprovedOrganisation();

      cy.visitFirst(ROUTES.profileOrganisationDetailsNameAndAddress.path);
    });

    after(() => {
      logout();
    });

    it("Has the correct tabs enabled", () => {
      hasSROEnabledTabsOrganisations();
    });
  });
});
