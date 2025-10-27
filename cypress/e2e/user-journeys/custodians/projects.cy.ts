import { ROUTES } from "@/consts/router";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
  hasProject,
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

describe("Projects custodians journey", () => {
  beforeEach(() => {
    loginCustodian();

    cy.visitFirst(ROUTES.profileCustodianProjects.path);
  });

  after(() => {
    // logout();
  });

  it("Adds a new project", () => {
    addNewProject(dataProject);

    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    hasProject(dataProject);
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
