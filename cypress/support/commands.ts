Cypress.Commands.add("login", (email: string, password: string) => {
  const args = { email, password };

  cy.session(args, () => {
    cy.origin(
      Cypress.env("keycloakBaseUrl"),
      { args },
      ({ email, password }) => {
        cy.visit(Cypress.env("keycloakBaseLoginPath"));

        cy.get("[id=username]").type(email);
        cy.get("[id=password]").type(password);

        cy.get("#kc-login").click();
      }
    );
  });
});

Cypress.Commands.add("dataCy", (value: string) => {
  return `[data-cy="${value}"]`;
});

Cypress.Commands.add("visitFirst", (path: string) => {
  cy.visit(path);

  cy.get("body").click();
});

Cypress.Commands.add("getResultsRow", (index: number) => {
  cy.get("tbody tr", { timeout: 10000 }).should("be.visible").eq(index);
});

Cypress.Commands.add("swalClick", (text: string, title: string = "Success") => {
  const swalContainer = cy.get(".swal2-container").should("be.visible");

  swalContainer.get(".swal2-title").contains(title);

  swalContainer.get("Button").contains(text).click();
});
