"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

// Appoints a claimed member of the organisation as its SRO. The API hands the role over:
// the current SRO becomes a delegate.
export default async (
  organisationId: number,
  userId: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await putRequest(`/organisations/${organisationId}/sro`, {
    user_id: userId,
  });

  return handleJsonResponse(response, options);
};
