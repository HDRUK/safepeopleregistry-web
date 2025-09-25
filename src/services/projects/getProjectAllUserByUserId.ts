import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { getRequest } from "../requests";
import { ProjectAllUserResponse } from "./types";

export default async (
  projectId: number,
  userId: number,
  options?: ResponseOptions
): Promise<ResponseJson<ProjectAllUserResponse>> => {
  console.log("****** calling with", projectId, userId);

  const response = await getRequest(
    `/projects/${projectId}/all_users/${userId}`
  );

  return handleJsonResponse(response, options);
};
