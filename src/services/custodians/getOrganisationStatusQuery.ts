import { UseQueryOptions } from "@tanstack/react-query";
import getOrganisationStatus from "./getOrganisationStatus";

type OrganisationStatus = Awaited<ReturnType<typeof getOrganisationStatus>>;

export default function getOrganisationStatusQuery(
  organisationId?: number
): UseQueryOptions<OrganisationStatus> {
  return {
    queryKey: ["getOrganisationStatus", organisationId],
    queryFn: () => getOrganisationStatus(organisationId!),
    enabled: !!organisationId,
  };
}
