"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import {
  PostSubsidiaryPayload,
  PostSubsidiaryResponse,
} from "@/services/subsidiaries";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  orgId: number,
  payload: PostSubsidiaryPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostSubsidiaryResponse>> => {
  const response = await postRequest(
    `/subsidiaries/organisations/${orgId}`,
    payload
  );

  return handleJsonResponse(response, options);
};
