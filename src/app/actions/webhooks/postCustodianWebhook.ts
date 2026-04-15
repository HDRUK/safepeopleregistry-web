"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { postRequest } from "@/services/requests";
import { PostCustodianWebhookPayload, Webhook } from "@/services/webhooks";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  payload: PostCustodianWebhookPayload,
  options: ResponseOptions
): Promise<ResponseJson<Webhook>> => {
  const response = await postRequest(`/webhooks/receivers`, payload);

  return handleJsonResponse(response, options);
};
