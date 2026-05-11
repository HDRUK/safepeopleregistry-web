"use server";

import { ProjectAllUserResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  projectId: number,
  userId: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectAllUserResponse>> => {
  const response = await getRequest(
    `/projects/${projectId}/all_users/${userId}`
  );

  return handleJsonResponse(response, options);
};
