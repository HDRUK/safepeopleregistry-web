"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { LookupSsoDomainResponse } from "@/services/sso_tenants/types";

// Unauthenticated - runs before the user has a session. postRequest still
// works fine here since getHeadersWithAuthorization() degrades gracefully
// with no access_token cookie present.
export default async (
  email: string,
  options?: ResponseOptions
): Promise<ResponseJson<LookupSsoDomainResponse>> => {
  const response = await postRequest("/sso/lookup", { email });

  return handleJsonResponse(response, { suppressThrow: true, ...options });
};
