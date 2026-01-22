import "cypress-maildev";
import "cypress-if";
import "./commands";

Cypress.on("uncaught:exception", err => {
  return !(/unknown/i.test(err.message) || /NEXT_REDIRECT/.test(err.message));
});

import "./commands";
