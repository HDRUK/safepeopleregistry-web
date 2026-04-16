import getMe from "@/app/actions/auth/getMe";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getMeUnclaimedQuery(options?: QueryOptions) {
  return {
    queryKey: ["getMeUnclaimed", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getMe({
        error: {
          message: "getMeUnclaimedError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getMe>>>;
}
