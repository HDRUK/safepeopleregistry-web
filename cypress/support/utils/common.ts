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

export { dataCy, getLoginPath };
