"use server";

import {
  PostCustodianUserPayload,
  PostCustodianUserResponse,
} from "@/services/custodian_users";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload: PostCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PostCustodianUserResponse>> => {
  const response = await postRequest(`/custodian_users`, payload);

  return handleJsonResponse(response, options);
};
