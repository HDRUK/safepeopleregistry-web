"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { WebhookEventTriggers } from "@/services/webhooks";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<WebhookEventTriggers[]>> => {
  const response = await getRequest(`/webhooks/event-triggers`);

  return handleJsonResponse(response, options);
};
