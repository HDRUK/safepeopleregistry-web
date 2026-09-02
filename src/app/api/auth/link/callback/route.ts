import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ROUTES } from "@/consts/router";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(req.url);
  const keycloakError = searchParams.get("error");
  const provider = cookieStore.get("link_provider")?.value;

  cookieStore.delete("link_provider");

  const redirectTarget = `${process.env.NEXT_PUBLIC_LOCAL_ENV}en${ROUTES.profileResearcherIdentity.path}`;

  if (keycloakError || !provider) {
    return NextResponse.redirect(
      encodeURI(`${redirectTarget}?linkStatus=error`)
    );
  }

  try {
    // Keycloak has already performed the OAuth handshake with the provider
    // and attached the federated identity to this user itself - this just
    // mirrors that into our local table for display/claims/activity.
    const response = await postRequest(`/linked_identities/${provider}`);

    await handleJsonResponse(response, {
      error: { message: "linkIdentityError" },
    });

    return NextResponse.redirect(
      encodeURI(`${redirectTarget}?linkStatus=success&provider=${provider}`)
    );
  } catch (e) {
    console.error(e);

    return NextResponse.redirect(
      encodeURI(`${redirectTarget}?linkStatus=error`)
    );
  }
}
