import axios from "axios";
import keycloakGateway from "@/config/keycloakGateway";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_OPTIONS } from "@/consts/cookies";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const accountType = searchParams.get("state");

  // external_redirect is intentionally left in place here - it's still
  // needed after Registry-side bootstrapping completes on /register.

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 }
    );
  }

  const tokenUrl = `${keycloakGateway.authServerUrl}/realms/${keycloakGateway.realm}/protocol/openid-connect/token`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloakGateway.clientId,
        client_secret: keycloakGateway.clientSecret,
        code,
        redirect_uri: keycloakGateway.redirectUriRegister,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in, refresh_expires_in } =
      response.data;

    cookieStore.set("access_token", access_token, {
      ...COOKIE_OPTIONS,
      maxAge: expires_in,
    });

    cookieStore.set("refresh_token", refresh_token, {
      ...COOKIE_OPTIONS,
      maxAge: refresh_expires_in,
    });

    const baseUrl = `${process.env.NEXT_PUBLIC_LOCAL_ENV}/en/register`;
    const url = accountType
      ? `${baseUrl}?type=${encodeURIComponent(accountType)}`
      : baseUrl;

    return NextResponse.redirect(encodeURI(url));
  } catch (e) {
    console.error(e);

    const errorType = encodeURIComponent("register");

    return NextResponse.redirect(
      encodeURI(
        `${process.env.NEXT_PUBLIC_LOCAL_ENV}/en/error?type=${errorType}`
      )
    );
  }
}
