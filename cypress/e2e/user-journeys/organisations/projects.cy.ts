import { ROUTES } from "@/consts/router";
import { logout } from "cypress/support/utils/common";
import {
  addNewProject,
  hasSponsoredProject,
} from "cypress/support/utils/custodian/projects";
import { DEFAULT_PROJECT } from "cypress/support/utils/data";
import { loginViaApi } from "cypress/support/utils/organisation/fastAuth";
import {
  confirmOrganisationSponsorship,
  hasOrganisationSponsorshipStatus,
} from "cypress/support/utils/organisation/projects";

const dataProject = DEFAULT_PROJECT;

const loginCustodianViaApi = () =>
  loginViaApi(Cypress.env("custodianEmail"), Cypress.env("custodianPassword"));

const loginOrganisationViaApi = () =>
  loginViaApi(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );

describe("Projects organisation journey", () => {
  before(() => {
    loginCustodianViaApi();
    cy.visitFirst(ROUTES.profileCustodianProjects.path);

    addNewProject(dataProject);
  });

  beforeEach(() => {
    loginOrganisationViaApi();

    cy.visitFirst(ROUTES.profileOrganisationProjects.path);
  });

  after(() => {
    logout();
  });

  it("should have no detectable accessibility violations on load", () => {
    cy.waitForLoadingToFinish();
    cy.checkA11yPage();
  });

  it("Shows sponsored projects", () => {
    cy.visitFirst(ROUTES.profileOrganisationProjects.path);

    hasSponsoredProject(dataProject);
  });

  it("Confirms sponsorship", () => {
    cy.getResultsCellByValue(dataProject.title).within(() => {
      cy.contains("a", dataProject.title).click();
    });

    confirmOrganisationSponsorship("Confirm sponsorship");

    hasOrganisationSponsorshipStatus("Confirmed");
  });

  it("Declines sponsorship", () => {
    cy.getResultsCellByValue(dataProject.title).within(() => {
      cy.contains("a", dataProject.title).click();
    });

    confirmOrganisationSponsorship("Decline sponsorship");

    hasOrganisationSponsorshipStatus("Declined");
  });
});
