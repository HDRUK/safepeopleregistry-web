"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { TrainingsResponse } from "@/services/trainings/types";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<TrainingsResponse>> => {
  const response = await getRequest(`/training/registry/${id}`);

  return handleJsonResponse(response, options);
};
