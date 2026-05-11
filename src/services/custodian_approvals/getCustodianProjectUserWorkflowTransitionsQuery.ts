import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "@/types/requests";
import getCustodianProjectUserWorkflowTransitions from "@/app/actions/custodian_approvals/getCustodianProjectUserWorkflowTransitions";

export default function getProjectUsersWorkflowTransitionsQuery(
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianProjectUserWorkflowTransitions",
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: () =>
      getCustodianProjectUserWorkflowTransitions({
        error: { message: "getCustodianProjectUserWorkflowTransitionsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getCustodianProjectUserWorkflowTransitions>>
  >;
}
