"use server";

import { GetCustodiansUserProjectsResponse } from "@/services/custodians";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export default async function getCustodiansUserProjects(
  custodianId: number,
  userId: number,
  searchParams: SearchParams,
  options?: ResponseOptions
): Promise<ResponseJson<Paged<GetCustodiansUserProjectsResponse>>> {
  const response = await getRequest(
    `/custodians/${custodianId}/users/${userId}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
}
