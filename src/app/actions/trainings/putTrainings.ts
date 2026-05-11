"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import {
  PutTrainingsPayload,
  PutTrainingsResponse,
} from "@/services/trainings/types";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutTrainingsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutTrainingsResponse>> => {
  const response = await putRequest(`/training/${id}`, payload);

  return handleJsonResponse(response, options);
};
