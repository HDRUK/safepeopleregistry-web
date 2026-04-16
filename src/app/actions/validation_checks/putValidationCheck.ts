"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { PutValidationCheck } from "@/services/validation_checks/types";
import { ValidationCheck } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutValidationCheck,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await putRequest(`/validation_checks/${id}`, payload);
  return handleJsonResponse(response, options);
};
