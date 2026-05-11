"use server";

import { OrganisationsResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<OrganisationsResponse>>> => {
  const response = await getRequest(
    `/organisations${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
