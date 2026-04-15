import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "@/types/requests";
import getCustodianProjectOrganisationWorkflowTransitions from "@/app/actions/custodian_approvals/getCustodianProjectOrganisationWorkflowTransitions";

export default function getProjectOrganisationWorkflowTransitionsQuery(
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianProjectOrganisationWorkflowTransitions",
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: () =>
      getCustodianProjectOrganisationWorkflowTransitions({
        error: {
          message: "getCustodianProjectOrganisationWorkflowTransitionsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<
    Awaited<
      ReturnType<typeof getCustodianProjectOrganisationWorkflowTransitions>
    >
  >;
}
