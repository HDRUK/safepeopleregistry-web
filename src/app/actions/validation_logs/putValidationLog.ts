"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ValidationLogAction } from "@/services/validation_logs/types";
import { ValidationLog } from "@/types/logs";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  logId: number,
  action: ValidationLogAction,
  options?: ResponseOptions
): Promise<ResponseJson<ValidationLog>> => {
  const response = await putRequest(`/validation_logs/${logId}?${action}`);
  return handleJsonResponse(response, options);
};
