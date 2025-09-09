import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAffiliations from "./getAffiliations";

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
