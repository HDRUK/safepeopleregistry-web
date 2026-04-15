"use server";

import { OrganisationResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: string | number,
  options: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await getRequest(`/organisations/${id}/idvt`, undefined);

  return handleJsonResponse(response, options);
};
