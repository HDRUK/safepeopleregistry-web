import { ResponseJson, ResponseOptions } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { ProjectResponse } from "./types";

export default async (
  id: number | string,
  userId: number | string,
  options: ResponseOptions
): Promise<ResponseJson<ProjectResponse>> => {
  const response = await getRequest(`/projects/${id}/users/${userId}`);

  return handleJsonResponse(response, options);
};
