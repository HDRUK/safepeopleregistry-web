import { EntityType } from "@/types/api";
import { SearchParams } from "@/types/query";
import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectsResponse } from "./types";

export type ProjectEntities = "organisation" | "custodian" | "user";

export default async (
  entity: EntityType,
  id: string | number | undefined,
  searchParams: SearchParams,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const response = await getRequest(
    `/${entity.toLowerCase()}s/${id}/projects${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
