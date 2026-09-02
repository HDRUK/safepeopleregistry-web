"use client";

import cookies from "js-cookie";
import { getGatewayLoginUrl, getLoginUrl } from "./keycloak";

function redirectKeycloak({
  redirect_uri,
  loggedIn,
  external_redirect,
  idp_hint,
}: {
  loggedIn: boolean;
  redirect_uri: string;
  external_redirect?: string;
  idp_hint?: string;
}) {
  if (external_redirect) {
    // A Gateway-originated login always re-authenticates against the
    // gateway Keycloak client, regardless of any existing Registry session -
    // the token needs to be scoped for Gateway, not for this app. This
    // takes precedence over idp_hint unconditionally - the gateway client
    // isn't expected to have enterprise SAML IdPs registered against it.
    cookies.set("external_redirect", external_redirect);
    window.location.href = getGatewayLoginUrl();
    return;
  }

  cookies.set("redirectPath", redirect_uri);

  let redirectUri = redirect_uri;

  if (!loggedIn) {
    redirectUri = getLoginUrl(idp_hint);
  }

  window.location.href = redirectUri;
}

export { redirectKeycloak };
