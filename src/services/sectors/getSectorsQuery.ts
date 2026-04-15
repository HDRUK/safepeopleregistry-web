import getSectors from "@/app/actions/sectors/getSectors";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getSectorsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSectors", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getSectors({
        error: {
          message: "getSectorsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getSectors>>>;
}
