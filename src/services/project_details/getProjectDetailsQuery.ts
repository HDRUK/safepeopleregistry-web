import getProjectDetails from "@/app/actions/professional_registrations/getProjectDetails";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getProjectDetailsQuery(
  id: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getProjectDetails", id, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getProjectDetails(queryKey[1] as number, {
        error: { message: "getProjectDetailsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectDetails>>>;
}
