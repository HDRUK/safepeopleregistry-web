"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  validationLogId: number,
  options: ResponseOptions
): Promise<ResponseJson<Comment[]>> => {
  const response = await getRequest(
    `/validation_logs/${validationLogId}/comments`
  );

  return handleJsonResponse(response, options);
};
