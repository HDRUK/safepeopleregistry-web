import getCustodian from "@/app/actions/custodians/getCustodian";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getCustodianQuery(
  custodianId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getCustodian", custodianId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getCustodian(queryKey[1] as number, {
        error: {
          message: "getCustodianError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodian>>>;
}
