import { dataCy } from "../../../support/utils/common";
import { ROUTES } from "../../../../src/consts/router";

describe("edit affilation", () => {
  beforeEach(() => {
    cy.login(Cypress.env("userEmail"), Cypress.env("userPassword"));

    cy.visitFirst(ROUTES.profileResearcherAffiliations.path);
  });

  it("Edits and affiliation and reloads the page", () => {
    cy.getResultsRow(0).find(dataCy("action-menu")).click();

    cy.get(".MuiPopover-root")
      .should("be.visible")
      .contains("View or edit")
      .click();

    const formModal = cy.get(dataCy("form-modal")).should("be.visible");

    formModal.get("#member_id").clear().type("1234");
    formModal.get("button").contains("Save").click();

    cy.swalClick("OK");

    cy.get("tbody tr").eq(0).get("td").contains("1234");
  });
});
