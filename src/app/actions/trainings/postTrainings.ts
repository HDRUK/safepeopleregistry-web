"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import {
  PostTrainingsPayload,
  PostTrainingsResponse,
} from "@/services/trainings/types";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  payload: PostTrainingsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostTrainingsResponse>> => {
  const response = await postRequest(
    `/training`,
    {
      ...payload,
      registry_id: id,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, options);
};
