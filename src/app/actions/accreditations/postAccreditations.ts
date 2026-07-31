"use server";

import {
  PostAccreditationsPayload,
  PostAccreditationsResponse,
} from "@/services/accreditations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  registryId: number,
  payload: PostAccreditationsPayload,
  options?: ResponseOptions
): Promise<ResponseJson<PostAccreditationsResponse>> => {
  const response = await postRequest(
    `/accreditations/${registryId}`,

    {
      ...payload,
    },
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  return handleJsonResponse(response, options);
};
