import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUserValidationLogs from "@/app/actions/validation_logs/getCustodianProjectUserValidationLogs";

export default function getCustodianProjectUserValidationLogsQuery(
  custodianId: number,
  projectId: number,
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianProjectUserValidationLogs",
      custodianId,
      projectId,
      registryId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianProjectUserValidationLogs(
        queryKey[1] as number,
        queryKey[2] as number,
        queryKey[3] as number,
        {
          error: { message: "getCustodianProjectUserValidationLogsError" },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectUserValidationLogs>>
  >;
}
