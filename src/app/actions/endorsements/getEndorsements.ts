"use server";

import { EndorsementsResponse } from "@/services/endorsements/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options: ResponseOptions
): Promise<ResponseJson<EndorsementsResponse>> => {
  const response = await getRequest(`/endorsements/${id}`, undefined);

  return handleJsonResponse(response, options);
};
