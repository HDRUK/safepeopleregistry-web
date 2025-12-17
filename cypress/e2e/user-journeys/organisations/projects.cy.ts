import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  addNewProject,
  hasSponsoredProject,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT } from "cypress/support/utils/data";
import { loginOrganisation } from "cypress/support/utils/organisation/auth";

const dataProject = DEFAULT_PROJECT;

describe("Projects organisation journey", () => {
  before(() => {
    loginCustodian();
    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    addNewProject(dataProject);
  });

  beforeEach(() => {
    loginOrganisation();

    cy.visitFirst(ROUTES.profileOrganisationProjects.path);
  });

  after(() => {
    logout();
  });

  it("Shows sponsored projects", () => {
    cy.visitFirst(ROUTES.profileOrganisationProjects.path);

    hasSponsoredProject(dataProject);
  });
});
