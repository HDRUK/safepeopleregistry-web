import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { shouldBeOrganisationProfile } from "cypress/support/utils/common";
import { EMAIL_REGISTER_VERIFICATION_LABEL } from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import {
  acceptTermsAndConditions,
  checkTermsAndConditionsContent,
  openOrganisationTermsAndConditions,
  registerKeycloak,
} from "cypress/support/utils/registration/register";

const registration = mockedRegistration();

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

  it("Has the correct Terms and Conditions content", () => {
    openOrganisationTermsAndConditions();

    checkTermsAndConditionsContent(
      /Understanding the Terms/i,
      /UNDERSTANDING THESE TERMS OF USE/i
    );
    checkTermsAndConditionsContent(
      /Researcher Usage/i,
      /USE OF THE SAFE PEOPLE REGISTRY BY RESEARCHERS/i
    );
    checkTermsAndConditionsContent(
      /Account Management/i,
      /YOUR ACCOUNT AND PASSWORD/i
    );
    checkTermsAndConditionsContent(/Acceptable Use/i, /ACCEPTABLE USE/i);
    checkTermsAndConditionsContent(
      /Intellectual Property/i,
      /INTELLECTUAL PROPERTY/i
    );
    checkTermsAndConditionsContent(/Input Data/i, /INPUT DATA/i);
    checkTermsAndConditionsContent(/Liability/i, /OUR LIABILITY/i);
    checkTermsAndConditionsContent(
      /Usage/i,
      /USE OF THE SAFE PEOPLE REGISTRY/i
    );
    checkTermsAndConditionsContent(
      /Suspension of Access/i,
      /SUSPENSION AND TERMINATION/i
    );
    checkTermsAndConditionsContent(
      /Changes to Terms/i,
      /CHANGES TO THESE TERMS/i
    );
    checkTermsAndConditionsContent(
      /Third Party Services/i,
      /THIRD PARTY CONTENT/i
    );
    checkTermsAndConditionsContent(
      /Other Terms/i,
      /OTHER IMPORTANT INFORMATION/i
    );
    checkTermsAndConditionsContent(
      /Governing Law/i,
      /GOVERNING LAW AND JURISDICTION/i
    );
    checkTermsAndConditionsContent(/Contact Information/i, /CONTACTING US/i);
  });

  it("Registers the organisation", () => {
    openOrganisationTermsAndConditions();

    acceptTermsAndConditions();

    registerKeycloak(registration);

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: registration.email,
    });

    shouldBeOrganisationProfile();
  });
});
