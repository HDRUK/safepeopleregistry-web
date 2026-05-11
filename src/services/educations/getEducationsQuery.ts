import getEducations from "@/app/actions/educations/getEducations";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getEducationsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getEducations", registryId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getEducations(queryKey[1] as number, {
        error: { message: "getEducationsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getEducations>>>;
}
