"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions, Paged } from "@/types/requests";
import { SsoTenant } from "@/services/sso_tenants/types";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<Paged<SsoTenant[]>>> => {
  const response = await getRequest("/sso_tenants");

  return handleJsonResponse(response, options);
};
