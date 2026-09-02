import crypto from "crypto";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import keycloakConfig from "@/config/keycloak";
import { COOKIE_OPTIONS } from "@/consts/cookies";
import { ROUTES } from "@/consts/router";
import { getAccessToken } from "@/utils/auth";

// Providers linkable via Keycloak's Client Initiated Account Linking flow -
// each must already be registered as an Identity Provider in the realm with
// a matching alias. See LinkedIdentityController::sync on the API side.
const SUPPORTED_PROVIDERS = ["orcid", "github"];

interface DecodedAccessToken {
  session_state?: string;
  sid?: string;
}

function errorRedirect() {
  return NextResponse.redirect(
    encodeURI(
      `${process.env.NEXT_PUBLIC_LOCAL_ENV}en${ROUTES.profileResearcherIdentity.path}?linkStatus=error`
    )
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider");

  if (!provider || !SUPPORTED_PROVIDERS.includes(provider)) {
    return errorRedirect();
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return errorRedirect();
  }

  const decoded = jwtDecode<DecodedAccessToken>(accessToken);
  const sessionState = decoded.session_state || decoded.sid;

  if (!sessionState) {
    return errorRedirect();
  }

  const cookieStore = await cookies();
  cookieStore.set("link_provider", provider, {
    ...COOKIE_OPTIONS,
    maxAge: 300,
  });

  const nonce = crypto.randomUUID();
  // Keycloak's Client Initiated Account Linking hash: proves this request
  // came from a page that holds the user's real active session, so Keycloak
  // links the provider identity onto that session's user rather than
  // creating/matching a different one.
  const hash = crypto
    .createHash("sha256")
    .update(nonce + sessionState + keycloakConfig.clientId + provider)
    .digest("base64url");

  const params = new URLSearchParams({
    client_id: keycloakConfig.clientId,
    redirect_uri: keycloakConfig.redirectUriLink,
    nonce,
    hash,
  });

  return NextResponse.redirect(
    `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/broker/${provider}/link?${params.toString()}`
  );
}
