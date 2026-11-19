import { ROUTES } from "@/consts/router";
import { mockedRegistration } from "@/mocks/data/auth";
import { faker } from "@faker-js/faker";
import {
  shouldBeAddAffiliation,
  shouldBeUserProfile,
} from "cypress/support/utils/common";
import {
  DEFAULT_AFFILIATION_USERS,
  EMAIL_REGISTER_VERIFICATION_LABEL,
} from "cypress/support/utils/data";
import { actionMessage } from "cypress/support/utils/mail";
import { addRegistrationAffiliation } from "cypress/support/utils/user/affiliations";
import {
  acceptTermsAndConditions,
  checkTermsAndConditionsContent,
  ignoreKeycloakPasswordValidatorError,
  openUserTermsAndConditions,
  registerKeycloak,
  setKeycloakPassword,
} from "cypress/support/utils/registration/register";

const registration = mockedRegistration();

describe("Register user journey", () => {
  beforeEach(() => {
    cy.visit(ROUTES.homepage.path);
  });

  it("Triggers the terms and conditions", () => {
    cy.contains("button", "Register").click();
    cy.contains("button[disabled]", "Continue").should("exist");

    cy.contains("button", /User/i).click();

    cy.contains("button", "Continue").click();
  });

  it("Has the correct Terms and Conditions content", () => {
    openUserTermsAndConditions();

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

  it("Registers the user", () => {
    openUserTermsAndConditions();

    ignoreKeycloakPasswordValidatorError();

    acceptTermsAndConditions();

    registerKeycloak(registration);

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: registration.email,
    });

    setKeycloakPassword(registration);

    shouldBeAddAffiliation();

    const affiliation = {
      ...DEFAULT_AFFILIATION_USERS,
      member_id: Cypress._.random(0, 1e6).toString(),
      email: faker.internet.email(),
    };

    addRegistrationAffiliation(affiliation);

    cy.contains("Verification needed").should("exist");
    cy.contains(
      `We have sent a verification email to ${affiliation.email}`
    ).should("exist");

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: affiliation.email,
    });

    shouldBeUserProfile();
  });
});
