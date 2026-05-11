import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectOrganisations from "@/app/actions/custodian_approvals/getCustodianProjectOrganisations";

export default function getCustodianProjectUsersQuery(
  custodianId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getCustodianProjectOrganisations", Number(custodianId)],
    queryFn: ({ queryKey }) =>
      getCustodianProjectOrganisations(queryKey[1] as number, {
        error: {
          message: `${queryKey[0]}Error`,
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectOrganisations>>
  >;
}
