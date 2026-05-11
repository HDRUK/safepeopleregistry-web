"use server";

import { GetProjectsResponse } from "@/services/organisations";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { SearchParams } from "@/types/query";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

export type ProjectEntities = "organisation" | "custodian" | "user";

export default async (
  id: string | number | undefined,
  searchParams: SearchParams,
  options: ResponseOptions
): Promise<ResponseJson<Paged<GetProjectsResponse>>> => {
  const response = await getRequest(
    `/organisations/${id}/projects/sponsorships/${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
