"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ProjectOrganisation } from "@/types/application";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectOrganisation>> => {
  const response = await getRequest(`/project_organisations/${id}`);

  return handleJsonResponse(response, options);
};
