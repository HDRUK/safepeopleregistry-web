"use server";

import {
  PostCustodianPayload,
  PostCustodianResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload: PostCustodianPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianResponse>> => {
  const response = await postRequest(`/custodians`, payload);

  return handleJsonResponse(response, options);
};
