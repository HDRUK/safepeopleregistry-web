import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { getStatus } from "@/utils/application";
import { dataCy, logout } from "cypress/support/utils/common";
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
  DEFAULT_ORGANISATION,
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_DETAILS,
} from "cypress/support/utils/data";
import { loginUser } from "cypress/support/utils/user/auth";

const dataProject = {
  ...DEFAULT_PROJECT,
  title: "Sponsored project",
};
const dataProjectDetails = DEFAULT_PROJECT_DETAILS;
const invitedSponsor = mockedOrganisationInvite();

describe("Projects", () => {
  before(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    addNewProject(dataProject);
  });

  beforeEach(() => {
    loginUser();
    cy.visitFirst(ROUTES.profileResearcherProjects.path);
    cy.get(dataCy("tabs-navigation")).contains("a", "Project").click();

    cy.getResultsCellByValue(dataProject.title).contains(
      "a",
      dataProject.title
    );
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Has the correct sponsorship status", () => {
    cy.get(dataCy("sponsorship-status"))
      .contains(getStatus(Status.SPONSORSHIP_PENDING))
      .should("exists");
  });

  it("Has the correct project status", () => {
    cy.get(dataCy("project-status"))
      .contains(getStatus(Status.PROJECT_PENDING))
      .should("exists");
  });

  it("Has the correct validation status", () => {
    cy.get(dataCy("validation-status"))
      .contains(getStatus(Status.PENDING))
      .should("exists");
  });
});
