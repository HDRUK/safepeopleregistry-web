import axios from "axios";
import keycloak from "@/config/keycloak";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_OPTIONS } from "@/consts/cookies";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token missing" },
      { status: 401 }
    );
  }

  const tokenUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/token`;
  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: keycloak.clientId,
        client_secret: keycloak.clientSecret,
        refresh_token: refreshToken,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const {
      access_token,
      refresh_token: newRefreshToken,
      expires_in,
      refresh_expires_in,
    } = response.data;

    cookieStore.set("access_token", access_token, {
      ...COOKIE_OPTIONS,
      maxAge: expires_in,
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: refresh_expires_in,
    });
    return NextResponse.json({ access_token });
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
