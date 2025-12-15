import { ROUTES } from "@/consts/router";
import { RegistrationValues } from "@/types/form";
import { dataCy } from "../common";
import { EMAIL_REGISTER_VERIFICATION_LABEL } from "../data";
import { actionMessage } from "../mail";

function checkTermsAndConditionsContent(
  label: string | RegExp,
  title: string | RegExp
) {
  cy.contains("label", label).within(() => {
    cy.get('input[type="radio"]').click();
  });

  cy.get(dataCy("terms-and-conditions_content")).within(() => {
    cy.contains("h3", title);
  });
}

function registerAndLogin(registration: RegistrationValues) {
  registerKeycloak(registration);

  actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
    to: registration.email,
  });

  cy.login(registration.email, registration.password);
  cy.visitFirst(ROUTES.register.path);
  cy.contains("button", "Continue").click();

  acceptTermsAndConditions();
}

function openUserTermsAndConditions() {
  cy.contains("button", "Register").click();
  cy.contains("button", /User/i).click();

  cy.contains("button", "Continue").click();
}

function openCustodianTermsAndConditions() {
  cy.contains("button", "Register").click();
  cy.contains("button", /Custodian/i).click();

  cy.contains("button", "Continue").click();
}

function openOrganisationTermsAndConditions() {
  cy.contains("button", "Register").click();
  cy.contains("button", /Organisation/i).click();

  cy.contains("button", "Continue").click();
}

function acceptTermsAndConditions() {
  cy.contains("button", "Accept Terms and Conditions").click();
}

function registerKeycloak(user: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}) {
  cy.get("#firstName").clear().type(user.first_name);
  cy.get("#lastName").clear().type(user.last_name);
  cy.get("#email").clear().type(user.email);
  cy.get("#password").clear().type(user.password);
  cy.get("#password-confirm").clear().type(user.password_confirm);

  // cy.solveGoogleReCAPTCHA();

  cy.contains("button", "Register").click();

  cy.contains(
    ".instruction",
    /An email with instructions to verify your email address has been sent to your address/i
  );

  cy.contains(
    ".instruction",
    /An email with instructions to verify your email address has been sent to your address/i
  );

  cy.contains(
    ".instruction",
    "Haven't received a verification code in your email? Click here to re-send the email."
  );

  cy.contains("a", "Click here");
}

export {
  acceptTermsAndConditions,
  checkTermsAndConditionsContent,
  openCustodianTermsAndConditions,
  openOrganisationTermsAndConditions,
  openUserTermsAndConditions,
  registerAndLogin,
  registerKeycloak,
};
