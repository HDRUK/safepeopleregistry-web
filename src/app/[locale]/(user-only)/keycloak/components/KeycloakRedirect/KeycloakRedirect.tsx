"use client";

import { redirectKeycloak } from "@/utils/redirectsClient";

interface KeycloakRedirectProps {
  loggedIn: boolean;
  redirect_uri: string;
  external_redirect?: string;
}

export default function KeycloakRedirect({
  loggedIn,
  redirect_uri,
  external_redirect,
}: KeycloakRedirectProps) {
  redirectKeycloak({
    loggedIn,
    redirect_uri,
    external_redirect,
  });

  return null;
}
