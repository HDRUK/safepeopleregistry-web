"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/sso_tenants/${id}/purge`);

  return handleJsonResponse(response, options);
};
