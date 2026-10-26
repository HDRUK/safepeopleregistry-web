import "cypress-maildev";
import "cypress-if";
import "./commands";
import { KEYCLOAK_PASSWORD_VALIDATOR_ERROR } from "./consts";

Cypress.on("uncaught:exception", err => {
  return !(
    /unknown/i.test(err.message) ||
    /NEXT_REDIRECT/.test(err.message) ||
    // TEMPORARY: see ignoreKeycloakPasswordValidatorError
    KEYCLOAK_PASSWORD_VALIDATOR_ERROR.test(err.message)
  );
});

import "./commands";
