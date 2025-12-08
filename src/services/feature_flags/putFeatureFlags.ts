import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { FeatureFlagsResponse } from "./types";

export default async (
  id: number,
  options?: ResponseOptions
): Promise<ResponseJson<FeatureFlagsResponse>> => {
  const response = await putRequest(`/features/${id}/toggle`);

  return handleJsonResponse(response, options);
};
