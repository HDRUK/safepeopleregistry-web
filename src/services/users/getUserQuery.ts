import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUser from "./getUser";

export default function getUserQuery(userId: number, options?: QueryOptions) {
  return {
    queryKey: ["getUser", userId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getUser(queryKey[1] as number, {
        error: {
          message: "getUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getUser>>;
}
