"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<string>> => {
  const response = await putRequest(`/email_logs/emails/${id}/resend`);

  return handleJsonResponse(response, options);
};
