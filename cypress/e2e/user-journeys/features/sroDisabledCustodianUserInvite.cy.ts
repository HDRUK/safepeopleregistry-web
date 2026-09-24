import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { mockedInvitedUser } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { dataCy } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
  goToProjectUsersList,
  hasInvitedProjectUser,
  inviteNewProjectUserForNewOrganisation,
  openNewProjectUserForNewOrganisationForm,
} from "cypress/support/utils/custodian/projects";
import {
  CUSTODIAN_SRO_EMAIL_DESCRIPTION,
  DEFAULT_ROLE_NAME,
  SRO_EMAIL_FORMAT_ERROR,
  SRO_EMAIL_LABEL,
  SRO_REQUIREMENT_FEATURE,
} from "cypress/support/utils/data";

// Creates its own project rather than reusing "Test project", so this spec
// doesn't depend on custodians/projects.cy.ts having run first.
const project = mockedProject({
  title: `SRO disabled user invite ${Cypress._.random(0, 1e6)}`,
  unique_id: faker.string.alphanumeric(10).toUpperCase(),
  lay_summary: faker.lorem.sentence(),
  technical_summary: faker.lorem.sentence(),
  public_benefit: faker.lorem.sentence(),
  request_category_type: "Health Data Research",
  start_date: "2024-07-01",
  end_date: "2025-07-01",
});

const newInvitedUser = () => mockedInvitedUser({ role: DEFAULT_ROLE_NAME });

describe("A Custodian invites a User at an unregistered Organisation, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  before(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    cy.waitForLoadingToFinish();

    addNewProject(project);
  });

  beforeEach(() => {
    loginCustodian();

    goToProjectUsersList(project.title);
  });

  it("Marks the SRO email address as optional and explains who to name", () => {
    openNewProjectUserForNewOrganisationForm();

    cy.get('label[for="organisation_email"]')
      .should("contain.text", SRO_EMAIL_LABEL)
      // FormControlWrapper only renders the red asterisk for required fields
      .and("not.contain.text", "*");

    cy.contains(CUSTODIAN_SRO_EMAIL_DESCRIPTION).should("be.visible");
  });

  it("Rejects a malformed SRO email address", () => {
    openNewProjectUserForNewOrganisationForm();

    cy.get("#organisation_name").clear().type(faker.company.name());
    cy.get("#organisation_email").clear().type("not-an-email");

    cy.saveFormClick("Invite");

    cy.contains(SRO_EMAIL_FORMAT_ERROR).should("be.visible");

    cy.get(dataCy("alert-modal")).should("not.exist");
  });

  it("Invites the User naming an SRO to contact", () => {
    const invite = newInvitedUser();
    const organisation = mockedOrganisationInvite();

    inviteNewProjectUserForNewOrganisation(invite, {
      organisation_name: organisation.organisation_name,
      organisation_email: organisation.lead_applicant_email,
    });

    hasInvitedProjectUser(invite);
  });

  it("Invites the User without naming an SRO", () => {
    const invite = newInvitedUser();

    inviteNewProjectUserForNewOrganisation(invite, {
      organisation_name: faker.company.name(),
    });

    hasInvitedProjectUser(invite);
  });
});
