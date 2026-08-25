"use server";

import { cookies } from "next/headers";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

interface PostGatewayHandoffResponse {
  code: string;
}

export default async (
  accessToken?: string,
  options?: ResponseOptions
): Promise<ResponseJson<PostGatewayHandoffResponse>> => {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auth/gateway_handoff`;

  // When called with a token in hand (e.g. immediately after exchanging a
  // code, in the same request), authenticate explicitly rather than via the
  // cookie store - cookies().get() isn't guaranteed to see a .set() made
  // earlier in that same request.
  const response = accessToken
    ? await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : await postRequest(url);

  const result = await handleJsonResponse(response, options);

  // The access/refresh token pair used to authenticate this call is scoped
  // to the gateway Keycloak client purely for this one handoff - it isn't a
  // Registry session and shouldn't linger in the browser afterwards.
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return result;
};
