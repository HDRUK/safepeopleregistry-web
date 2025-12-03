import { dataCy } from "../common";


const hasCheckedOnUsersConfiguration = () => {
    cy.get(dataCy("sub-tabs-navigation")).within(() => {
        cy.contains('a', 'Automated Flags').click();
    });
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'Identity').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User has verified their identity via the Identity Verification Technology (IDVT).').should("exist");
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'User location').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User is located in a country which has UK equivalent data protection laws.').should("exist");
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'Training').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User has completed the NHS Research Secure Data Environment training.').should("exist");
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'Training').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User has completed the ONS Accredited Researcher training.').should("exist");
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'Training').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User has completed the MRC GDPR training.').should("exist");
    cy.get('#10').should("exist").uncheck();
    cy.contains('p', 'User affiliation').should("exist");
    cy.contains('p', ':').should("exist");
    cy.contains('p', 'A User has been affiliated by a relevant, validated Organisation.').should("exist");
};

const hasUnCheckedOnUsersConfiguration = () => {
   
};

const hasCheckedOnOrganisationConfiguration = () => {
   
};

const hasUnCheckedOnOrganisationConfiguration = () => {

};

export {
    hasCheckedOnUsersConfiguration,
    hasUnCheckedOnUsersConfiguration,
    hasCheckedOnOrganisationConfiguration,
    hasUnCheckedOnOrganisationConfiguration,
};