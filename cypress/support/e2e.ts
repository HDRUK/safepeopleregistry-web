import "cypress-maildev";
import "cypress-if";
import "./commands";

Cypress.on("uncaught:exception", err => {
  console.error("App error:", err);
  return false;
});

import "./commands";
