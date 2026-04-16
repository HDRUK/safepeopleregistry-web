import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectOrganisation from "@/app/actions/custodian_approvals/getCustodianProjectOrganisation";

export default function getCustodianProjectOrganisationQuery(
  custodianId: number,
  projectOrganisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianProjectOrganisation",
      Number(custodianId),
      Number(projectOrganisationId),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianProjectOrganisation(
        queryKey[1] as number,
        queryKey[2] as number,
        {
          error: {
            message: "getCustodianProjectOrganisationError",
          },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectOrganisation>>
  >;
}
