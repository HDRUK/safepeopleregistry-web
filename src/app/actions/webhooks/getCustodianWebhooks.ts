"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Webhook } from "@/services/webhooks";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  custodianId: number,
  options?: ResponseOptions
): Promise<ResponseJson<Webhook[]>> => {
  const response = await getRequest(`/webhooks/receivers/${custodianId}`);

  return handleJsonResponse(response, options);
};
