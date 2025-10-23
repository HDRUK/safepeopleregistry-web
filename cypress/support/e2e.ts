Cypress.on("uncaught:exception", err => {
  return !(/hydrat/i.test(err.message) || /unknown/i.test(err.message));
});

import "./commands";
