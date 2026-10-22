import { ROUTES } from "@/consts/router";
import { runWithFeatureFlag } from "cypress/support/utils/admin/features";
import { SRO_REQUIREMENT_FEATURE } from "cypress/support/utils/data";
import { openOrganisationTermsAndConditions } from "cypress/support/utils/registration/register";

describe("Register organisation journey", () => {
  beforeEach(() => {
    cy.visit(ROUTES.homepage.path);
  });

  it("Triggers the terms and conditions", () => {
    cy.contains("button", "Register").click();
    cy.contains("button[disabled]", "Continue").should("exist");

    cy.contains("button", /Organisation/i).click();

    cy.contains("button", "Continue").click();
  });

  describe("SRO requirement disabled", () => {
    runWithFeatureFlag(SRO_REQUIREMENT_FEATURE, false);

    it("Has the correct Terms and Conditions content", () => {
      openOrganisationTermsAndConditions();

      cy.contains("h3", "Register as an Organisation").should("exist");

      cy.contains(
        "If you are an Organisation and would like to use the Safe People Registry, please email us at"
      ).should("exist");

      cy.contains("a", "enquiries@safepeopleregistry.org")
        .should("have.attr", "href", "mailto:enquiries@safepeopleregistry.org")
        .should("exist");

      cy.contains("button", "Close").click();

      cy.contains("h3", "Register as an Organisation").should("not.exist");
    });
  });
});
