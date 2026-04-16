import getOrganisation from "@/app/actions/organisations/getOrganisation";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getOrganisationQuery(
  organisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getOrganisation",
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) => {
      return getOrganisation(queryKey[1] as number, {
        error: {
          message: "getOrganisationError",
        },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisation>>>;
}
