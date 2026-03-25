import { ResponseJson } from "@/types/requests";
import { getRequest } from "../requests";
import { handleJsonResponse } from "../requestHelpers";
import { GetProjectOrganisationStatusResponse } from "../organisations/getProjectOrganisationStatus";

export default async (
  custodianId: number,
  projectId: number,
  organisationId: number
): Promise<ResponseJson<GetProjectOrganisationStatusResponse>> => {
  const response = await getRequest(
    `/custodian_approvals/${custodianId}/project/${projectId}/organisation/${organisationId}/projectOrganisations/status`
  );

  return handleJsonResponse(response);
};
