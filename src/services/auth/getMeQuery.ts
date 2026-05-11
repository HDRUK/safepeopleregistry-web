import getMe from "@/app/actions/auth/getMe";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getMeQuery(options?: QueryOptions) {
  return {
    queryKey: ["getMe", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getMe({
        error: {
          message: "getMeError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getMe>>>;
}
