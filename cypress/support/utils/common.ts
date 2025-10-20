const dataCy = (value: string) => {
  return `[data-cy="${value}"]`;
};

const getLoginPath = () => {
  const authUrl = `/realms/${Cypress.env("keycloakRealm")}/protocol/openid-connect/auth`;
  const params = new URLSearchParams({
    client_id: Cypress.env("keycloakClientId"),
    response_type: "code",
    redirect_uri: Cypress.env("keycloakLoginRedirectUrl"),
    scope: "openid profile email",
  });

  return `${authUrl}?${params.toString()}`;
};

const logout = (fnError?: () => void) => {
  cy.get("header")
    .contains("button", "Sign Out", {
      timeout: 2000,
    })
    .click()
    .then(() => {
      cy.origin(Cypress.env("keycloakBaseUrl"), { args: null }, () => {
        cy.get("#kc-logout", {
          timeout: 2000,
        }).click();
      }).catch(() => {
        fnError?.();
      });
    });
};

export { dataCy, getLoginPath, logout };
