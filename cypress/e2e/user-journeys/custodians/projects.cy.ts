import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
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
} from "cypress/support/utils/data";

const dataProject = DEFAULT_PROJECT;
const dataProjectDetails = DEFAULT_PROJECT_DETAILS;
const invitedSponsor = mockedOrganisationInvite();

describe("Projects custodians journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);
  });

  after(() => {
    logout();
  });
  it('should have no detectable accessibility violations on load', () => {
      cy.waitForLoadingToFinish();
      cy.checkA11yPage();
    });

  it("Adds a new project", () => {
    addNewProject(dataProject);

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    hasProject(dataProject);
  });

  it("Invites a sponsor", () => {
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
