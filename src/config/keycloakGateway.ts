const keycloakGatewayConfig = {
  realm: `${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
  clientId: `${process.env.NEXT_PUBLIC_KEYCLOAK_GATEWAY_CLIENT_ID}`,
  clientSecret: `${process.env.KEYCLOAK_GATEWAY_CLIENT_SECRET}`,
  authServerUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}`,
  redirectUriLogin: `${process.env.NEXT_PUBLIC_KEYCLOAK_GATEWAY_REDIRECT_URL_LOGIN}`,
  redirectUriRegister: `${process.env.NEXT_PUBLIC_KEYCLOAK_GATEWAY_REDIRECT_URL_REGISTER}`,
};

export default keycloakGatewayConfig;
