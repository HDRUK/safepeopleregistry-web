import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianStatus from "./getCustodianStatus";

export default function getCustodianStatusQuery(
  custodianId: number | undefined,
  projectUserId: number | undefined,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianStatus",
      custodianId,
      projectUserId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianStatus(queryKey[1] as number, queryKey[2] as number, {
        error: {
          message: "getCustodianStatusError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianStatus>>>;
}
