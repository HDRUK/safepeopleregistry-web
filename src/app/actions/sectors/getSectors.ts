"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SectorsResponse } from "@/services/sectors/types";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";

export default async (
  options: ResponseOptions
): Promise<ResponseJson<Paged<SectorsResponse>>> => {
  const response = await getRequest(`/sectors`);

  return handleJsonResponse(response, options);
};
