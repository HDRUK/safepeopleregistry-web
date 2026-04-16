"use server";

import { OrganisationResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson, ResponseOptions } from "@/types/requests";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await getRequest(`/organisations/${id}`, undefined);

  return handleJsonResponse(response, options);
};
