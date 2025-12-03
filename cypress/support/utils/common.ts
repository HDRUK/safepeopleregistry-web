const dataCy = (value: string) => {
  return `[data-cy="${value}"]`;
};



const logout = () => {
  /* Yet to fix */
  // cy.get("button")
  //   .contains("Sign Out")
  //   .click()
  //   .then(() => {
  //     cy.origin(Cypress.env("keycloakBaseUrl"), { args: null }, () => {
  //       const { getKeycloakLogoutPath } = Cypress.require("./auth");
  //       cy.visit(getKeycloakLogoutPath());
  //       cy.get("#kc-logout").click();
  //     });
  //   });
};

export { dataCy, logout };
