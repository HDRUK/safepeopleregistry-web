"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { SsoTenant } from "@/services/sso_tenants/types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<SsoTenant>> => {
  const response = await postRequest(`/sso_tenants/${id}/approve`);

  return handleJsonResponse(response, options);
};
