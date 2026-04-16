"use server";

import { ProjectDetailsResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson } from "@/types/requests";

export default async (
  id: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectDetailsResponse>> => {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_V1_URL}/project_details/${id}`
  );

  return handleJsonResponse(response, options);
};
