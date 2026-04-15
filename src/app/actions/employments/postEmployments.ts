"use server";

import {
  PostEmploymentsPayload,
  PostEmploymentsResponse,
} from "@/services/employments/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  registryId: number,
  payload: PostEmploymentsPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostEmploymentsResponse>> => {
  const response = await postRequest(`/employments/${registryId}`, payload);

  return handleJsonResponse(response, options);
};
