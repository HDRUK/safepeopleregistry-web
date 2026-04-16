"use server";

import {
  PostProjectDetailsPayload,
  PostProjectDetailsResponse,
} from "@/services/project_details";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostProjectDetailsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostProjectDetailsResponse>> => {
  const response = await postRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details`,
    payload
  );

  return handleJsonResponse(response, options);
};
