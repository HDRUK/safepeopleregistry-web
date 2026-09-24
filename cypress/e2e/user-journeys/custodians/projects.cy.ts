import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
  hasProject,
  hasProjectSponsor,
  invitesNewSponsor,
  updateSafeDataProject,
  updateSafeOutputsProject,
  updateSafeSettingsProject,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_DETAILS,
  SRO_REQUIREMENT_FEATURE,
} from "cypress/support/utils/data";

const dataProject = DEFAULT_PROJECT;
const dataProjectDetails = DEFAULT_PROJECT_DETAILS;
const invitedSponsor = mockedOrganisationInvite();

describe("Projects custodians journey", () => {
  // hasProjectSponsor() expects the sponsor to show as Invited, which only
  // happens when the Organisation is created through /organisations/unclaimed.
  // With the SRO requirement disabled a Custodian's invite goes to
  // unclaimed_before_superadmin_invitation instead, which leaves the
  // Organisation stateless. Declared here so the spec doesn't inherit whatever
  // the flag happens to be when it runs.
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, true);

  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Adds a new project", () => {
    addNewProject(dataProject);

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    hasProject(dataProject);
  });

  it("Invites a sponsor", () => {
    cy.contains("a", dataProject.title).click();

    invitesNewSponsor(invitedSponsor);

    hasProjectSponsor();
  });

  it("Edits safe data", () => {
    cy.contains("a", dataProject.title).click();
    cy.contains("a", "Safe Data").click();

    updateSafeDataProject(dataProjectDetails);
  });

  it("Edits safe settings", () => {
    cy.contains("a", dataProject.title).click();
    cy.contains("a", "Safe Settings").click();

    updateSafeSettingsProject(dataProjectDetails);
  });

  it("Edits safe outputs", () => {
    cy.contains("a", dataProject.title).click();
    cy.contains("a", "Safe Outputs").click();

    updateSafeOutputsProject(dataProjectDetails);
  });
});
