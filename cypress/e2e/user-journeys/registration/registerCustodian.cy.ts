import { ROUTES } from "@/consts/router";
import { openCustodianTermsAndConditions } from "cypress/support/utils/registration/register";

describe("Register custodian journey", () => {
  beforeEach(() => {
    cy.visitFirst(ROUTES.homepage.path);
  });

  it("Triggers the terms and conditions", () => {
    cy.contains("button", "Register").click();
    cy.contains("button[disabled]", "Continue").should("exist");

    cy.contains("button", /Custodian/i).click();

    cy.contains("button", "Continue").click();
  });

  it("Has the correct Terms and Conditions content", () => {
    openCustodianTermsAndConditions();

    cy.contains("h3", "Register as a Custodian").should("exist");

    cy.contains(
      "If you are a Data Custodian and would like to use the Safe People Registry, please email us at"
    ).should("exist");

    cy.contains("a", "enquiries@safepeopleregistry.org")
      .should("have.attr", "href", "mailto:enquiries@safepeopleregistry.org")
      .should("exist");

    cy.contains("button", "Close").click();

    cy.contains("h3", "Register as a Custodian").should("not.exist");
  });
});
