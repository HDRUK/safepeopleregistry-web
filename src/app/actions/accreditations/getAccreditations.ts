"use server";

import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "@/services/requests";
import { handleJsonResponse } from "@/services/requestHelpers";
import { AccreditationsResponse } from "@/services/accreditations/types";

export default async (
  resgitryId: number,
  options: ResponseOptions
): Promise<ResponseJson<Paged<AccreditationsResponse>>> => {
  const response = await getRequest(`/accreditations/${resgitryId}`);

  return handleJsonResponse(response, options);
};
