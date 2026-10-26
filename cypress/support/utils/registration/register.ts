import { RegistrationValues } from "@/types/form";
import { ROUTES } from "@/consts/router";
import { dataCy, signout } from "../common";
import { actionMessage } from "../mail";
import { EMAIL_REGISTER_VERIFICATION_LABEL } from "../data";
import { KEYCLOAK_PASSWORD_VALIDATOR_ERROR } from "../../consts";

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

// TEMPORARY: see KEYCLOAK_PASSWORD_VALIDATOR_ERROR. Errors thrown on the
// Keycloak origin are only passed to handlers registered inside cy.origin.
function ignoreKeycloakPasswordValidatorError() {
  cy.origin(
    Cypress.env("keycloakBaseUrl"),
    { args: { source: KEYCLOAK_PASSWORD_VALIDATOR_ERROR.source } },
    ({ source }) => {
      cy.on("uncaught:exception", err => !new RegExp(source).test(err.message));
    }
  );
}

function registerAndLogin(registration: RegistrationValues) {
  registerKeycloak(registration);

  // cy.login's cy.session clears every cookie, but in a real browser the
  // invite cookie set by the invite link survives signing out and back in.
  cy.getCookie("invite_code").then(inviteCookie => {
    signout();

    actionMessage(EMAIL_REGISTER_VERIFICATION_LABEL, {
      to: registration.email,
    });

    cy.contains("a", /Click here to proceed/i).click();
    setKeycloakPassword(registration);

    cy.login(registration.email, registration.password);

    if (inviteCookie) {
      cy.setCookie("invite_code", inviteCookie.value);
    }

    cy.visitFirst(ROUTES.register.path);
    cy.contains("button", "Continue").click();

    acceptTermsAndConditions();
  });
}

// The email verification link lands on Keycloak's "Set your password" page.
function setKeycloakPassword(user: {
  password: string;
  password_confirm: string;
}) {
  cy.get("#password-new").type(user.password);
  cy.get("#password-confirm").type(user.password_confirm);
  cy.get("#kc-submit").click();
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
  // password: string;
  // password_confirm: string;
}) {
  cy.get("#firstName").clear().type(user.first_name);
  cy.get("#lastName").clear().type(user.last_name);

  // Invite links pass login_hint, which the theme uses to prefill the email
  // and make it readonly. Manual sign up leaves it empty and editable.
  cy.get("#email").then($email => {
    if ($email.prop("readOnly")) {
      cy.wrap($email).should("have.value", user.email);
    } else {
      cy.wrap($email).clear().type(user.email);
    }
  });
  // cy.get("#password").clear().type(user.password);
  // cy.get("#password-confirm").clear().type(user.password_confirm);

  // cy.solveGoogleReCAPTCHA();

  cy.contains("button", "Register").click();

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
  checkTermsAndConditionsContent,
  openUserTermsAndConditions,
  acceptTermsAndConditions,
  registerKeycloak,
  openOrganisationTermsAndConditions,
  openCustodianTermsAndConditions,
  registerAndLogin,
  ignoreKeycloakPasswordValidatorError,
  setKeycloakPassword,
};
