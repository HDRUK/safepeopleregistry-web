import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedAffiliation } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { dataCy } from "cypress/support/utils/common";
import {
  DEFAULT_FROM_DATE,
  DEFAULT_TO_DATE,
  SRO_EMAIL_FORMAT_ERROR,
  SRO_EMAIL_LABEL,
  SRO_REQUIREMENT_FEATURE,
  USER_SRO_EMAIL_DESCRIPTION,
} from "cypress/support/utils/data";
import {
  addAffiliationForNewOrganisationUsers,
  hasAffiliationUsers,
  openNewOrganisationAffiliationForm,
} from "cypress/support/utils/user/affiliations";
import { loginUser } from "cypress/support/utils/user/auth";

const newAffiliation = () =>
  mockedAffiliation({
    relationship: "Employee",
    role: "Manager",
    member_id: Cypress._.random(0, 1e6).toString(),
    from: DEFAULT_FROM_DATE,
    to: DEFAULT_TO_DATE,
    current_employer: false,
    email: undefined,
  });

describe("A User affiliates to an unregistered Organisation, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  beforeEach(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);

    cy.waitForLoadingToFinish();
  });

  it("Marks the SRO email address as optional and explains who to name", () => {
    openNewOrganisationAffiliationForm();

    cy.get('label[for="organisation_email"]')
      .should("contain.text", SRO_EMAIL_LABEL)
      // FormControlWrapper only renders the red asterisk for required fields
      .and("not.contain.text", "*");

    cy.contains(USER_SRO_EMAIL_DESCRIPTION).should("be.visible");
  });

  it("Rejects a malformed SRO email address", () => {
    openNewOrganisationAffiliationForm();

    cy.get("#organisation_name").clear().type(faker.company.name());
    cy.get("#organisation_email").clear().type("not-an-email");

    cy.saveFormClick();

    cy.contains(SRO_EMAIL_FORMAT_ERROR).should("be.visible");

    cy.get(dataCy("alert-modal")).should("not.exist");
  });

  it("Adds an affiliation without naming an SRO", () => {
    const affiliation = newAffiliation();

    addAffiliationForNewOrganisationUsers(affiliation, {
      organisation_name: faker.company.name(),
    });

    cy.clickAlertModal();

    hasAffiliationUsers(affiliation, Status.AFFILIATION_PENDING);
  });

  it("Adds an affiliation naming an SRO to contact", () => {
    const affiliation = newAffiliation();
    const organisation = mockedOrganisationInvite();

    addAffiliationForNewOrganisationUsers(affiliation, {
      organisation_name: organisation.organisation_name,
      organisation_email: organisation.lead_applicant_email,
    });

    cy.clickAlertModal();

    hasAffiliationUsers(affiliation, Status.AFFILIATION_PENDING);
  });
});
