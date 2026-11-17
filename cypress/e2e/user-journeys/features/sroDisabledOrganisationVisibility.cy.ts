import { ROUTES } from "@/consts/router";
import { mockedOrganisationInvite } from "@/mocks/data/organisation";
import { mockedProject } from "@/mocks/data/project";
import { mockedAffiliation } from "@/mocks/data/user";
import { faker } from "@faker-js/faker";
import { loginAdmin } from "cypress/support/utils/admin/auth";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { dataCy } from "cypress/support/utils/common";
import { loginCustodian } from "cypress/support/utils/custodian/auth";
import {
  createProjectAndInviteNewSponsor,
  openProject,
} from "cypress/support/utils/custodian/projects";
import {
  DEFAULT_FROM_DATE,
  SRO_REQUIREMENT_FEATURE,
} from "cypress/support/utils/data";
import { addAffiliationForNewOrganisationUsers } from "cypress/support/utils/user/affiliations";
import { loginUser } from "cypress/support/utils/user/auth";

const uniqueName = (prefix: string) => `${prefix} ${Cypress._.random(0, 1e6)}`;

const project = mockedProject({
  title: uniqueName("Organisation visibility"),
  unique_id: faker.string.alphanumeric(10).toUpperCase(),
  start_date: "2024-07-01",
  end_date: "2025-07-01",
});

const sponsor = mockedOrganisationInvite({
  organisation_name: uniqueName("Restricted sponsor"),
  lead_applicant_email: faker.internet
    .email({ provider: "example.com" })
    .toLowerCase(),
});


const currentEmployerName = uniqueName("Current employer");

const hasApprovalStatus = (
  organisationName: string,
  status: "Approved" | "Not approved"
) => {
  cy.getResultsRowByValue(organisationName).within(() => {
    cy.contains("td", status);
  });
};

const openResearcherOrganisationOptions = () => {
  loginUser();

  cy.visitFirst(ROUTES.profileResearcherAffiliations.path);

  cy.waitForLoadingToFinish();

  cy.buttonClick("Add affiliation");

  cy.get(dataCy("form-modal")).should("be.visible");

  cy.get("#organisation_id").click();

  // Proves the options have loaded (see currentEmployerName)
  cy.get(".MuiPopover-root li").should("contain", currentEmployerName);

  return cy.get(".MuiPopover-root");
};

describe("Restricted Organisations are only offered to those allowed to see them, SRO requirement disabled", () => {
  runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

  before(() => {
    loginUser();

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);

    cy.waitForLoadingToFinish();

    addAffiliationForNewOrganisationUsers(
      mockedAffiliation({
        relationship: "Employee",
        role: "Researcher",
        member_id: Cypress._.random(0, 1e6).toString(),
        from: DEFAULT_FROM_DATE,
        to: undefined,
        email: faker.internet.email({ provider: "example.com" }),
      }),
      { organisation_name: currentEmployerName }
    );

    cy.clickAlertModal("Close", "Verification needed");
  });

  it("Offers a researcher their restricted current employer before approval", () => {
    openResearcherOrganisationOptions().should("contain", currentEmployerName);
  });

  describe("A Custodian's new Organisation", () => {
    before(() => {
      loginCustodian();

      cy.visitFirst(ROUTES.profileCustodianProjects.path);

      cy.waitForLoadingToFinish();

      createProjectAndInviteNewSponsor(project, sponsor);
    });

    it("Is offered to the Custodian that created it", () => {
      loginCustodian();

      cy.visitFirst(ROUTES.profileCustodianProjects.path);

      cy.waitForLoadingToFinish();

      openProject(project);

      cy.get("#sponsor_id").click();

      cy.contains(".MuiPopover-root li", sponsor.organisation_name).should(
        "contain",
        "Pending approval by HDR UK"
      );
    });

    it("Is not offered to a researcher before approval", () => {
      openResearcherOrganisationOptions().should(
        "not.contain",
        sponsor.organisation_name
      );
    });

    it("Is offered to a researcher once a superadmin approves it", () => {
      loginAdmin();

      cy.visitFirst(ROUTES.profileAdmin.path);

      cy.contains("Organisations").click();

      cy.get("#searchByText")
        .clear()
        .type(`${sponsor.organisation_name}{enter}`);


      cy.waitForLoadingToFinish();

      hasApprovalStatus(sponsor.organisation_name, "Not approved");

      cy.getResultsActionMenu(sponsor.organisation_name).click();

      cy.actionMenuClick("Approve");

      hasApprovalStatus(sponsor.organisation_name, "Approved");

      openResearcherOrganisationOptions().should(
        "contain",
        sponsor.organisation_name
      );
    });
  });
});
