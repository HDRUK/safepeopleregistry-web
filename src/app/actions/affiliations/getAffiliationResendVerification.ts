"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<null>> => {
  const response = await getRequest(`/affiliations/${id}/resend/verification`);

  return handleJsonResponse(response, options);
};
