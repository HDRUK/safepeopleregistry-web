import { ResponseJson, ResponseOptions } from "@/types/requests";
import { handleJsonResponse } from "../requestHelpers";
import { putRequest } from "../requests";
import { OrganisationResponse, PutSystemApprovedPayload } from "./types";

export default async (
  id: number,
  payload: PutSystemApprovedPayload,
  options?: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await putRequest(`/organisations/${id}/approved`, payload);

  return handleJsonResponse(response, options);
};
