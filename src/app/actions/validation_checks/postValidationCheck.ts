"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { PostValidationCheck } from "@/services/validation_checks/types";
import { ValidationCheck } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostValidationCheck,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationCheck>> => {
  const response = await postRequest(`/custodians/validation_checks`, payload);
  return handleJsonResponse(response, options);
};
