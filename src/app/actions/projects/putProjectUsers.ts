"use server";

import {
  PutProjectUsersPayload,
  PostProjectUsersResponse,
} from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PutProjectUsersPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectUsersResponse>> => {
  const response = await putRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/projects/${id}/all_users`,
    payload
  );

  return handleJsonResponse(response, options);
};
