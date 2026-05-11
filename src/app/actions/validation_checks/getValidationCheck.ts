"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ValidationCheck } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  validationCheckId: number,
  options: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await getRequest(`/validation_checks/${validationCheckId}`);

  return handleJsonResponse(response, options);
};
