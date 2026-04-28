import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import keycloak from "@/config/keycloak";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      await axios.post(
        `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: keycloak.clientId,
          client_secret: keycloak.clientSecret,
          refresh_token: refreshToken,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
    } catch (e) {
      console.error(e);

      const errorType = encodeURIComponent("logout");

      return NextResponse.redirect(
        encodeURI(
          `${process.env.NEXT_PUBLIC_LOCAL_ENV}/en/error?type=${errorType}`
        )
      );
    }
  }

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return NextResponse.redirect(
    encodeURI(`${process.env.NEXT_PUBLIC_LOCAL_ENV}`)
  );
}
