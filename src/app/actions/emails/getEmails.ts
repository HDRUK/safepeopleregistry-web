"use server";

import { EmailsResponse } from "@/services/emails/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  searchParams: Record<string, string | number | undefined>,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<EmailsResponse>>> => {
  const response = await getRequest(
    `/email_logs${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
