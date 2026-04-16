"use server";

import { ProjectsResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  registryId: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectsResponse>> => {
  const response = await getRequest(`/projects/user/${registryId}/validated`);

  return handleJsonResponse(response, options);
};
