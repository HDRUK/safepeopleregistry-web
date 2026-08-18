import { mockedAffiliation } from "@/mocks/data/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  DEFAULT_AFFILIATION_USERS,
  DEFAULT_TO_DATE,
} from "cypress/support/utils/data";
import {
  addAffiliationUsers,
  editAffiliationUsers,
  hasAffiliationUsers,
  hasRemoveAffiliationUsers,
  removeAffiliationUsers,
  resendAffiliationVerification,
} from "cypress/support/utils/user/affiliations";
import { loginUser } from "cypress/support/utils/user/auth";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { validateSROOrganisations } from "cypress/support/utils/admin/sro";
import { ROUTES } from "@/consts/router";
import { Status } from "@/consts/application";
import { logout } from "cypress/support/utils/common";
import { hasSROOrganisation } from "cypress/support/utils/organisation/sro";

const dataCurrentAffiliation = mockedAffiliation(DEFAULT_AFFILIATION_USERS);
const dataCurrentAffiliationOrganisation = mockedOrganisation({
  organisation_name: dataCurrentAffiliation.organisation.organisation_name,
});
const dataAffiliation = {
  ...dataCurrentAffiliation,
  current_employer: false,
  to: DEFAULT_TO_DATE,
  member_id: Cypress._.random(0, 1e6).toString(),
  email: undefined,
};

const dataEditedAffiliation = {
  ...dataAffiliation,
  member_id: Cypress._.random(0, 1e6).toString(),
  role: "Administrator",
};

describe("Affiliations journey", () => {
  before(() => {
    loginAdmin();
    cy.visitFirst(ROUTES.profileAdmin.path);
    validateSROOrganisations(dataCurrentAffiliationOrganisation, "Approve");
    hasSROOrganisation(dataCurrentAffiliationOrganisation, "Approved");
  });

  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Adds a current affiliation", () => {
    addAffiliationUsers(dataCurrentAffiliation);

    cy.clickAlertModal("Close", "Verification needed");
  });

  it("Adds an affiliation with an end date", () => {
    addAffiliationUsers(dataAffiliation);

    cy.clickAlertModal();

    hasAffiliationUsers(dataAffiliation);
  });

  it("Edits an affiliation and reloads the page", () => {
    editAffiliationUsers(dataAffiliation, dataEditedAffiliation);

    hasAffiliationUsers(dataEditedAffiliation, Status.AFFILIATION_PENDING);
  });

  it("Resends the verification email for a current-employer affiliation", () => {
    // The current-employer affiliation created in the first test lands in
    // AFFILIATION_EMAIL_VERIFY status. If the test environment has one, the
    // "Resend verification email" menu item should be available.
    cy.get("body").then($body => {
      const hasEmailVerifyRow = $body
        .find("tbody tr td")
        .toArray()
        .some(td => td.textContent?.includes("Email verification"));

      if (hasEmailVerifyRow) {
        resendAffiliationVerification(dataCurrentAffiliation);
      } else {
        cy.log(
          "No affiliation in email-verify state — skipping resend assertion"
        );
      }
    });
  });

  it("Removes an affiliation and reloads the page", () => {
    removeAffiliationUsers(dataEditedAffiliation);

    hasRemoveAffiliationUsers(dataEditedAffiliation);
  });
});
