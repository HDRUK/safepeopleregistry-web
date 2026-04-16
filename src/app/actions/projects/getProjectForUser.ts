"use server";

import { ProjectResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number | string,
  userId: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectResponse>> => {
  const response = await getRequest(`/projects/${id}/users/${userId}`);

  return handleJsonResponse(response, options);
};
