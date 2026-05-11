"use server";

import {
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
} from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutProjectDetailsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutProjectDetailsResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
