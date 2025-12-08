import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { postRequest } from "../requests";
import { FeatureFlagsResponse, PostFeatureFlagsQueryPayload } from "./types";

export default async (
  id: number,
  payload: PostFeatureFlagsQueryPayload,
  options?: ResponseOptions
): Promise<ResponseJson<FeatureFlagsResponse>> => {
  const response = await postRequest(`/features/${id}/toggle`, payload);

  return handleJsonResponse(response, options);
};
