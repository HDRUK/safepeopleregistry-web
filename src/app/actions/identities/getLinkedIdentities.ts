"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { GetLinkedIdentitiesResponse } from "@/services/identities";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<GetLinkedIdentitiesResponse>> => {
  const response = await getRequest("/linked_identities");

  return handleJsonResponse(response, options);
};
