import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { faker } from "@faker-js/faker";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  createProjectAndInviteNewSponsor,
  hasUninvitedProjectSponsor,
} from "cypress/support/utils/custodian/projects";
import { SRO_REQUIREMENT_FEATURE } from "cypress/support/utils/data";

const project = mockedProject({
  title: `SRO disabled sponsor ${Cypress._.random(0, 1e6)}`,
  unique_id: faker.string.alphanumeric(10).toUpperCase(),
  start_date: "2024-07-01",
  end_date: "2025-07-01",
});

const sponsor = mockedOrganisationInvite();

describe("A Custodian invites a project sponsor, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  before(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    cy.waitForLoadingToFinish();

    createProjectAndInviteNewSponsor(project, sponsor);
  });

  it("Attaches the Organisation as the sponsor without inviting it", () => {
    hasUninvitedProjectSponsor(sponsor);
  });

  it("Does not raise a pending Organisation invite", () => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);

    cy.contains("Invites").click();

    cy.selectValue("#filterByUser", "Organisations");
    cy.get("#searchByText").clear().type(sponsor.lead_applicant_email);

    cy.waitForLoadingToFinish();

    cy.contains(sponsor.lead_applicant_email).should("not.exist");
  });
});
