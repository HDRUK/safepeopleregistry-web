// import { register as registerCypressGrep } from '@cypress/grep'
// registerCypressGrep()
Cypress.on("uncaught:exception", err => {
  return !/unknown/i.test(err.message);
});

import "./commands";
