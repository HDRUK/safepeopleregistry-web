import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUserStates from "@/app/actions/custodian_approvals/getCustodianProjectUserStates";

export default function getCustodianProjectUserStatesQuery(
  options?: QueryOptions
) {
  return {
    queryKey: ["getCustodianProjectUserStates"],
    queryFn: ({ queryKey }) =>
      getCustodianProjectUserStates({
        error: {
          message: `${queryKey[0]}Error`,
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectUserStates>>
  >;
}
