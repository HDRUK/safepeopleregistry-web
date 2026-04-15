import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { SearchParams } from "@/types/query";
import getCustodianValidationChecks from "@/app/actions/validation_checks/getCustodianValidationChecks";

export default function getCustodianValidationChecksQuery(
  custodianId: number,
  searchParams: SearchParams,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianValidationChecks",
      custodianId,
      searchParams,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianValidationChecks(
        queryKey[1] as number,
        queryKey[2] as SearchParams,
        {
          error: { message: "getCustodianValidationChecksError" },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianValidationChecks>>
  >;
}
