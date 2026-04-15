import { UseQueryOptions } from "@tanstack/react-query";
import getProjectOrganisationStatus from "../../app/actions/custodians/getProjectOrganisationStatus";

export default function getProjectOrganisationStatusQuery(
  custodianId: number,
  projectId: number,
  organisationId: number
) {
  return {
    queryKey: [
      "getProjectOrganisationStatus",
      custodianId,
      projectId,
      organisationId,
    ],
    queryFn: () =>
      getProjectOrganisationStatus(custodianId, projectId, organisationId),
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getProjectOrganisationStatus>>
  >;
}
