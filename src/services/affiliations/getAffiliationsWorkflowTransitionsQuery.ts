import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAffiliationsWorkflowTransitions from "@/app/actions/affiliations/getAffiliationsWorkflowTransitions";
import getAffiliations from "@/app/actions/affiliations/getAffiliations";

export default function getAffiliationsQuery(options?: QueryOptions) {
  return {
    queryKey: [
      "getAffiliationsWorkflowTransitions",
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: () =>
      getAffiliationsWorkflowTransitions({
        error: { message: "getAffiliationsWorkflowTransitionsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getAffiliations>>>;
}
