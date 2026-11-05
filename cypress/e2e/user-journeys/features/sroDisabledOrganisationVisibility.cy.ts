import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { dataCy } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  createProjectAndInviteNewSponsor,
  hasUninvitedProjectSponsor,
  openProject,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_AFFILIATION_USERS,
  SRO_REQUIREMENT_FEATURE,
} from "cypress/support/utils/data";
import { loginUser } from "cypress/support/utils/user/auth";

const project = mockedProject({
  title: `Organisation visibility ${Cypress._.random(0, 1e6)}`,
  unique_id: faker.string.alphanumeric(10).toUpperCase(),
  start_date: "2024-07-01",
  end_date: "2025-07-01",
});

const sponsor = mockedOrganisationInvite();

// A seeded Organisation every researcher can see. The helper waits for it to
// appear before the test checks the new sponsor is missing, so a list that
// hasn't loaded (or failed to load) can't make that check pass by mistake.
const SEEDED_ORGANISATION_NAME =
  DEFAULT_AFFILIATION_USERS.organisation.organisation_name;

const openResearcherOrganisationOptions = () => {
  loginUser();

  cy.visitFirst(ROUTES.profileResearcherAffiliations.path);

  cy.waitForLoadingToFinish();

  cy.buttonClick("Add affiliation");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.get("#organisation_id").click();

  // Proves the options have loaded (see SEEDED_ORGANISATION_NAME)
  cy.get(".MuiPopover-root li").should("contain", SEEDED_ORGANISATION_NAME);

  return cy.get(".MuiPopover-root");
};

// A Custodian's new Organisation is restricted: only that Custodian (and
// admins) can see it until a superadmin approves it.
describe("A Custodian's new Organisation is hidden until approved, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  before(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    cy.waitForLoadingToFinish();

    createProjectAndInviteNewSponsor(project, sponsor);
  });

  it("Is visible to the Custodian that created it", () => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    cy.waitForLoadingToFinish();

    openProject(project);

    hasUninvitedProjectSponsor(sponsor);
  });

  it("Is not offered to a researcher before approval", () => {
    openResearcherOrganisationOptions().should(
      "not.contain",
      sponsor.organisation_name
    );
  });

  it("Is offered to a researcher once a superadmin approves it", () => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);

    cy.contains("Organisations").click();

    cy.get("#searchByText").clear().type(`${sponsor.organisation_name}{enter}`);

    cy.getResultsActionMenu(sponsor.organisation_name).click();

    cy.actionMenuClick("Approve");

    cy.getResultsActionMenu(sponsor.organisation_name).click();

    cy.contains("Unapprove").should("exist");

    openResearcherOrganisationOptions().should(
      "contain",
      sponsor.organisation_name
    );
  });
});
