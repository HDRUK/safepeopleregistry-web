import { ResponseJson } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetOrganisationStatusResponse } from "../organisations/getOrganisationStatus";

export default async (
  organisationId: number
): Promise<ResponseJson<GetOrganisationStatusResponse>> => {
  const response = await getRequest(`/organisations/${organisationId}/status`);
  console.log(response, "response");

  return handleJsonResponse(response);
};
