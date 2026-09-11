"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { deleteRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  provider: string,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await deleteRequest(`/linked_identities/${provider}`);

  return handleJsonResponse(response, options);
};
