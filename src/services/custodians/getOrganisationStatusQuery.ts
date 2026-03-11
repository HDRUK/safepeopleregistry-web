import { UseQueryOptions } from "@tanstack/react-query";
import getOrganisationStatus from "./getOrganisationStatus";

export default function getOrganisationStatusQuery(organisationId: number) {
  return {
    queryKey: ["getOrganisationStatus", organisationId],
    queryFn: () => getOrganisationStatus(organisationId),
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisationStatus>>>;
}
