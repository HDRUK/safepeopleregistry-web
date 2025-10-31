const loginAdmin = () => {
  cy.login("peter.hammans+admin@hdruk.ac.uk", Cypress.env("adminPassword"));
};

export { loginAdmin };
