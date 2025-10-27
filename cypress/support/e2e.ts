Cypress.on("uncaught:exception", err => {
  return !(
    /minified react error/i.test(err.message) ||
    /hydrat/i.test(err.message) ||
    /unknown/i.test(err.message)
  );
});

import "./commands";
