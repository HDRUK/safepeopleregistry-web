const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
// cy.logToken();
      // cy.logAllApiResponses();

};

const loginUnapprovedOrganisation = () => {
  cy.login(
    Cypress.env("unapprovedOrganisationEmail"),
    Cypress.env("unapprovedOrganisationPassword")
  );
   

};

export { loginOrganisation, loginUnapprovedOrganisation };
