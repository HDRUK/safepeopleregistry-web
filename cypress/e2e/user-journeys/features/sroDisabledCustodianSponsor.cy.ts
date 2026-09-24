import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { hasNoOrganisationInvite } from "cypress/support/utils/admin/users";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  createProjectAndInviteNewSponsor,
  hasSelectedProjectSponsor,
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

  it("Attaches the Organisation to the project as its sponsor", () => {
    hasSelectedProjectSponsor(sponsor);
  });

  // The flag-off behaviour: the superadmin is notified to go and contact the
  // Organisation, rather than the Organisation being invited to register.
  it("Does not raise a pending Organisation invite", () => {
    loginAdmin();

    cy.visitFirst(ROUTES.profileAdmin.path);

    hasNoOrganisationInvite(sponsor.lead_applicant_email);
  });
});
