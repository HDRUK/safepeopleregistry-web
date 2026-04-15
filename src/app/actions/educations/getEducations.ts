"use server";

import { EducationsResponse } from "@/services/educations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EducationsResponse>> => {
  const response = await getRequest(`/educations/${id}`);

  return handleJsonResponse(response, options);
};
