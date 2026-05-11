import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectOrganisationStates from "@/app/actions/custodian_approvals/getCustodianProjectOrganisationStates";

export default function getCustodianProjectUserStatesQuery(
  options?: QueryOptions
) {
  return {
    queryKey: ["getCustodianProjectOrganisationStates"],
    queryFn: ({ queryKey }) =>
      getCustodianProjectOrganisationStates({
        error: {
          message: `${queryKey[0]}Error`,
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectOrganisationStates>>
  >;
}
