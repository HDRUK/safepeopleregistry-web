Cypress.on("uncaught:exception", err => {
  return !(/hydrat/i.test(err.message) || /unknown/i.test(err.message));
});

// Cypress.on("before:run", () => {
//   cy.task("log", "Display some logging");

//   console.log("*********** RUNNING ************");

//   cy.exec("./scripts/cypress.backup.sh");
// });

// Cypress.on("after:run", () => {
//   cy.exec("./scripts/cypress.restore.sh");
// });

import "./commands";
