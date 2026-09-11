"use client";

import { redirectKeycloak } from "@/utils/redirectsClient";

interface KeycloakRedirectProps {
  loggedIn: boolean;
  redirect_uri: string;
  external_redirect?: string;
  idp_hint?: string;
}

export default function KeycloakRedirect({
  loggedIn,
  redirect_uri,
  external_redirect,
  idp_hint,
}: KeycloakRedirectProps) {
  redirectKeycloak({
    loggedIn,
    redirect_uri,
    external_redirect,
    idp_hint,
  });

  return null;
}
