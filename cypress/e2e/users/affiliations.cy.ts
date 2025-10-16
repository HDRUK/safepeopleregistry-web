import { mockedAffiliation } from "../../../mocks/data/user";
import { ROUTES } from "../../../src/consts/router";
import { formatShortDate } from "../../../src/utils/date";
import { dataCy } from "../../support/utils/common";

const memberId = Cypress._.random(0, 1e6);

describe("User affiliations", () => {
  beforeEach(() => {
    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"));

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  it("Adds an affiliation and reloads the page", () => {
    cy.buttonClick("Add affiliation");

    cy.get(dataCy("form-modal")).should("be.visible");

    const affiliation = mockedAffiliation({
      relationship: "Employee",
      organisation: {
        organisation_name: "Health Data Research UK",
      },
      role: "Manager",
    });

    const fromDate = "2025-01-01";

    cy.dateSelectValue("from", fromDate);
    cy.checkboxCheck("current_employer");
    cy.selectValue(
      "organisation_id",
      affiliation.organisation.organisation_name
    );
    cy.selectValue("relationship", affiliation.relationship);
    cy.get("#role").type("affiliation.role");
    cy.get("#member_id").type(affiliation.member_id);
    cy.get("#email").type(affiliation.email);

    cy.saveFormClick();
    cy.swalClick("Close", "Verification needed");

    const lastRow = cy.getResultsRow("last");

    lastRow.within(() => {
      return cy.contains("td", affiliation.relationship);
    });

    lastRow.within(() => {
      return cy.contains("td", affiliation.member_id);
    });

    lastRow.within(() => {
      return cy.contains("td", "Email verification needed");
    });

    lastRow.within(() => {
      return cy.contains("td", `${formatShortDate(fromDate)} - Present`);
    });
  });

  it("Edits an affiliation and reloads the page", () => {
    cy.getResultsRow("last").within(() =>
      cy.get(dataCy("action-menu")).click()
    );

    cy.actionMenuClick("View or edit");

    const affiliation = mockedAffiliation({
      relationship: "Employee",
      organisation: {
        organisation_name: "Health Data Research UK",
      },
      role: "Manager",
      member_id: memberId,
    });

    const fromDate = "2025-01-01";
    const toDate = "2025-02-01";

    cy.checkboxUncheck("current_employer");
    cy.dateSelectValue("from", fromDate);
    cy.dateSelectValue("to", toDate);
    cy.selectValue("relationship", affiliation.relationship);
    cy.get("#role").clear().type(affiliation.role);
    cy.get("#member_id").clear().type(affiliation.member_id);

    cy.saveFormClick();
    cy.swalClick();

    const lastRow = cy.getResultsRow("last");

    lastRow.within(() => {
      return cy.contains("td", affiliation.relationship);
    });

    lastRow.within(() => {
      return cy.contains("td", affiliation.member_id);
    });

    lastRow.within(() => {
      return cy.contains(
        "td",
        `${formatShortDate(fromDate)} - ${formatShortDate(toDate)}`
      );
    });
  });

  it("Removes an affiliation and reloads the page", () => {
    cy.getResultsRow("last").within(() =>
      cy.get(dataCy("action-menu")).click()
    );

    cy.actionMenuClick("Delete");

    cy.swalClick("Delete", "Warning");
    cy.swalClick("Close");

    const lastRow = cy.getResultsRow("last");

    lastRow.within(() => {
      return cy.contains("td", memberId).should("not.exist");
    });
  });
});
