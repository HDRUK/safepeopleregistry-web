import { Paged, ResponseJson, ResponseOptions } from "@/types/requests";
import { getSearchQuerystring } from "@/utils/query";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectAllUsersResponse } from "./types";

export default async (
  projectId: number,
  searchParams: Record<string, string | number | undefined>,
  options: ResponseOptions
): Promise<ResponseJson<Paged<ProjectAllUsersResponse>>> => {
  const response = await getRequest(
    `/projects/${projectId}/all_users${getSearchQuerystring(searchParams)}`
  );

  return handleJsonResponse(response, options);
};
