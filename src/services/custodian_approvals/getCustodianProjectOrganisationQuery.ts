import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectOrganisation from "./getCustodianProjectOrganisation";

export default function getCustodianProjectOrganisationQuery(
  custodianId: number,
  projectOrganisationId: number,
  options?: QueryOptions
) {
  const suspenseEnabled =
    options?.suspenseEnabled || options?.suspenseEnabled === undefined;

  return {
    queryKey: [
      "getCustodianProjectOrganisation",
      Number(custodianId),
      Number(projectOrganisationId),
    ],
    queryFn: ({ queryKey }) =>
      suspenseEnabled
        ? getCustodianProjectOrganisation(
            queryKey[1] as number,
            queryKey[2] as number,
            {
              error: {
                message: "getCustodianProjectOrganisationError",
              },
              ...options?.responseOptions,
            }
          )
        : null,
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectOrganisation>>
  >;
}
