"use server";

import { GetProjectRolesResponse } from "@/services/project_roles";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  options?: ResponseOptions
): Promise<ResponseJson<GetProjectRolesResponse>> => {
  const response = await getRequest(`/project_roles`);

  return handleJsonResponse(response, options);
};
