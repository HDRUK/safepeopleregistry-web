"use server";

import { ProjectsResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { EntityType } from "@/types/api";
import { SearchParams } from "@/types/query";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";

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
