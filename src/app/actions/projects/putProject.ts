"use server";

import { PutProjectPayload, PutProjectResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutProjectPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PutProjectResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}`,
    payload
  );

  return handleJsonResponse(response, options);
};
