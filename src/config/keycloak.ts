const keycloakConfig = {
  realm: `${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
  clientId: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`,
  clientSecret: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET}`,
  authServerUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}`,
  redirectUriLogin: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGIN}`,
  redirectUriLogout: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LOGOUT}`,
  redirectUriRegister: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_REGISTER}`,
  // Client Initiated Account Linking redirect - see /api/auth/link/*. Must be
  // added to this client's "Valid Redirect URIs" in Keycloak alongside the
  // login/register ones.
  redirectUriLink: `${process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URL_LINK}`,
};

export default keycloakConfig;
