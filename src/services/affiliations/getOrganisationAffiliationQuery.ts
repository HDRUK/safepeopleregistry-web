import getOrganisationAffiliation from "@/app/actions/affiliations/getOrganisationAffiliation";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getOrganisationAffiliationQuery(
  registryId: number,
  organisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getOrganisationAffiliation",
      registryId,
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getOrganisationAffiliation(queryKey[1] as number, queryKey[2] as number, {
        error: { message: "getOrganisationAffiliationError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisationAffiliation>>>;
}
