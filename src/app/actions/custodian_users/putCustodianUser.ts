"use server";

import {
  PutCustodianUserPayload,
  PutCustodianUserResponse,
} from "@/services/custodian_users";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  userId: number,
  payload: PutCustodianUserPayload,
  options: ResponseOptions
): Promise<ResponseJson<PutCustodianUserResponse>> => {
  const response = await putRequest(`/custodian_users/${userId}`, payload);

  return handleJsonResponse(response, options);
};
