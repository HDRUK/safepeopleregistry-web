"use server";

import { PutPrimaryContactPayload } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { putRequest } from "@/services/requests";
import { ProjectUser } from "@/types/application";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  projectId: number,
  registryId: number,
  payload: PutPrimaryContactPayload,
  options: ResponseOptions
): Promise<ResponseJson<ProjectUser>> => {
  const response = await putRequest(
    `/projects/${projectId}/users/${registryId}/primary_contact`,
    payload
  );

  return handleJsonResponse(response, options);
};
