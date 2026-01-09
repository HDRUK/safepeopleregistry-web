import { Status } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { getStatus } from "@/utils/application";
<<<<<<< Updated upstream
=======
import { faker } from "@faker-js/faker";
>>>>>>> Stashed changes
import { dataCy, logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
<<<<<<< Updated upstream
  hasProject,
  hasProjectSponsor,
=======
  addNewProjectUser,
  hasProject,
  hasProjectSponsor,
  inviteNewProjectUser,
>>>>>>> Stashed changes
  invitesNewSponsor,
  updateSafeDataProject,
  updateSafeOutputsProject,
  updateSafeSettingsProject,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_ORGANISATION,
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_DETAILS,
<<<<<<< Updated upstream
=======
  DEFAULT_PROJECT_INVITE_USERS,
  DEFAULT_PROJECT_USERS_CUSTODIANS,
  DEFAULT_USER,
>>>>>>> Stashed changes
} from "cypress/support/utils/data";
import { loginUser } from "cypress/support/utils/user/auth";

const dataProject = {
  ...DEFAULT_PROJECT,
<<<<<<< Updated upstream
  title: "Sponsored project",
};
const dataProjectDetails = DEFAULT_PROJECT_DETAILS;
const invitedSponsor = mockedOrganisationInvite();
=======
  title: faker.string.sample(10),
};
>>>>>>> Stashed changes

describe("Projects", () => {
  before(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    addNewProject(dataProject);
<<<<<<< Updated upstream
=======

    cy.contains("a", "Safe People").click();

    addNewProjectUser(DEFAULT_USER);
>>>>>>> Stashed changes
  });

  beforeEach(() => {
    loginUser();
<<<<<<< Updated upstream
    cy.visitFirst(ROUTES.profileResearcherProjects.path);
    cy.get(dataCy("tabs-navigation")).contains("a", "Project").click();

    cy.getResultsCellByValue(dataProject.title).contains(
      "a",
      dataProject.title
    );
=======

    cy.visitFirst(ROUTES.profileResearcherProjects.path);
    cy.contains("a", dataProject.title);
>>>>>>> Stashed changes
  });

  after(() => {
    logout();
  });

<<<<<<< Updated upstream
  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });
=======
  // it("should have no detectable accessibility violations on load", () => {
  //   cy.waitForLoadingToFinish();
  //   cy.checkA11yPage();
  // });
>>>>>>> Stashed changes

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
