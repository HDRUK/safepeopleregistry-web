import { ResponseJson, ResponseOptions } from "@/types/requests";
import { putRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { OrganisationResponse, PutOrganisationPayload } from "./types";

export default async (
  id: number,
  payload: PutOrganisationPayload,
  options?: ResponseOptions
): Promise<ResponseJson<OrganisationResponse>> => {
  const response = await putRequest(`/organisations/${id}`, payload);

  return handleJsonResponse(response, options);
};
