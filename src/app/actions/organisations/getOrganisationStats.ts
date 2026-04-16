"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  statType: string,
  orgId: number,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await getRequest(
    `/organisations/${orgId}/counts/${statType}`,
    undefined
  );

  return handleJsonResponse(response, options);
};
