import getAffiliations from "@/app/actions/affiliations/getAffiliations";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getAffiliationsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getAffiliations", registryId],
    queryFn: ({ queryKey }) =>
      getAffiliations(queryKey[1] as number, {
        error: { message: "getAffiliationsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getAffiliations>>>;
}
