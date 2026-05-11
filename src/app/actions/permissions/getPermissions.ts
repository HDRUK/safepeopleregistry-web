"use server";

import { PermissionsResponse } from "@/services/permissions";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<PermissionsResponse>>> => {
  const response = await getRequest(`/permissions`);

  return handleJsonResponse(response, options);
};
