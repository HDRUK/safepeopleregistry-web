import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUserValidationLogs from "./getCustodianProjectUserValidationLogs";

export default function getCustodianProjectUserValidationLogsQuery(
  custodianId: number,
  projectId: number,
  registryId: number,
  options?: QueryOptions
) {
  const suspenseEnabled =
    options?.suspenseEnabled || options?.suspenseEnabled === undefined;

  return {
    queryKey: [
      "getCustodianProjectUserValidationLogs",
      custodianId,
      projectId,
      registryId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      suspenseEnabled
        ? getCustodianProjectUserValidationLogs(
            queryKey[1] as number,
            queryKey[2] as number,
            queryKey[3] as number,
            {
              error: { message: "getCustodianProjectUserValidationLogsError" },
              ...options?.responseOptions,
            }
          )
        : null,
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectUserValidationLogs>>
  >;
}
