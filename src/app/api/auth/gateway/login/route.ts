import axios from "axios";
import keycloakGateway from "@/config/keycloakGateway";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAllowedExternalRedirect } from "@/utils/externalRedirect";
import postGatewayHandoff from "@/app/actions/auth/postGatewayHandoff";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const externalRedirect = cookieStore.get("external_redirect")?.value;

  cookieStore.delete("external_redirect");

  if (!code || !isAllowedExternalRedirect(externalRedirect)) {
    return NextResponse.json(
      { error: "Authorization code or external redirect is missing/invalid" },
      { status: 400 }
    );
  }

  const tokenUrl = `${keycloakGateway.authServerUrl}/realms/${keycloakGateway.realm}/protocol/openid-connect/token`;

  try {
    const tokenResponse = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: keycloakGateway.clientId,
        client_secret: keycloakGateway.clientSecret,
        code,
        redirect_uri: keycloakGateway.redirectUriLogin,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    const { data } = await postGatewayHandoff(access_token);

    if (!data?.code) {
      throw new Error("Gateway handoff code was not issued");
    }

    return NextResponse.redirect(
      encodeURI(`${externalRedirect}?code=${data.code}`)
    );
  } catch (e) {
    console.error(e);

    const errorType = encodeURIComponent("login");

    return NextResponse.redirect(
      encodeURI(
        `${process.env.NEXT_PUBLIC_LOCAL_ENV}/en/error?type=${errorType}`
      )
    );
  }
}
