import "cypress-maildev";
import "./commands";

Cypress.on("uncaught:exception", err => {
  // Ignore React/Next.js hydration mismatch errors
  if (
    err.message.includes("hydration") ||
    err.message.includes("Minified React error #418")
  ) {
    return false;
  }
});

import "./commands";
