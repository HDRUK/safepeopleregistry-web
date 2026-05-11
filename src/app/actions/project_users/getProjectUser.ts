"use server";

import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ProjectUser } from "@/types/application";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectUser>> => {
  const response = await getRequest(`/project_users/${id}`);

  return handleJsonResponse(response, options);
};
