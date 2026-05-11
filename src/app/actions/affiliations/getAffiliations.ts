"use server";

import { GetAffiliationsResponse } from "@/services/affiliations/types";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async (
  registryId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetAffiliationsResponse>>> => {
  const response = await getRequest(
    `/affiliations/${registryId}${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
