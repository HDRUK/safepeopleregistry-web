"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { PostSsoTenantPayload, SsoTenant } from "@/services/sso_tenants/types";

export default async (
  payload: PostSsoTenantPayload,
  options?: ResponseOptions
): Promise<ResponseJson<SsoTenant>> => {
  const response = await postRequest("/sso_tenants", payload);

  return handleJsonResponse(response, options);
};
