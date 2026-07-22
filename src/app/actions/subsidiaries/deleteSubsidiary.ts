"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  subsidaryId: number,
  orgId: number,
  options: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(
    `/subsidiaries/${subsidaryId}/organisations/${orgId}`
  );

  return handleJsonResponse(response, options);
};
