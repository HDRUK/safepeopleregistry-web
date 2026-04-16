"use server";

import { ProjectsResponse } from "@/services/projects";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseOptions, ResponseJson, Paged } from "@/types/requests";

export default async (
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectsResponse>>> => {
  const params = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  const queryString = params.toString();

  const response = await getRequest(
    `/projects${queryString ? `?${queryString}` : ""}`
  );

  return handleJsonResponse(response, options);
};
