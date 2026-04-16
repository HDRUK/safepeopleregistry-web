"use server";

import { GetProjectOrganisationStatusResponse } from "@/app/actions/organisations/getProjectOrganisationStatus";
import { handleJsonResponse } from "@/services/requestHelpers";
import { getRequest } from "@/services/requests";
import { ResponseJson } from "@/types/requests";

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
