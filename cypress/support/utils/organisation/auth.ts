const loginOrganisation = () => {
  cy.login(
    Cypress.env("organisationEmail"),
    Cypress.env("organisationPassword")
  );
};

const loginUnapprovedOrganisation = () => {
  cy.login(
    Cypress.env("unapprovedOrganisationEmail"),
    Cypress.env("unapprovedOrganisationPassword")
  );
   

};

export { loginOrganisation, loginUnapprovedOrganisation };
