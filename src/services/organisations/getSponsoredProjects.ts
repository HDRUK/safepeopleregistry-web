import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { GetProjectsResponse } from "./types";

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
