"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";
import { SsoTenant } from "@/services/sso_tenants/types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<SsoTenant>> => {
  const response = await deleteRequest(`/sso_tenants/${id}`);

  return handleJsonResponse(response, options);
};
