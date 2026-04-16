import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianOrganisationValidationLogs from "@/app/actions/validation_logs/getCustodianOrganisationValidationLogs";

export default function getCustodianOrganisationValidationLogsQuery(
  custodianId: number,
  organisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianOrganisationValidationLogs",
      custodianId,
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianOrganisationValidationLogs(
        queryKey[1] as number,
        queryKey[2] as number,
        {
          error: { message: "getCustodianOrganisationValidationLogsError" },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianOrganisationValidationLogs>>
  >;
}
