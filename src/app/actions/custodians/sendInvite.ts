"use server";

import {
  SendCustodianInvitePayload,
  SendCustodianInviteResponse,
} from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  payload: SendCustodianInvitePayload,
  options: ResponseOptions
): Promise<ResponseJson<SendCustodianInviteResponse>> => {
  const response = await postRequest(`/trigger_email`, payload);

  return handleJsonResponse(response, options);
};
