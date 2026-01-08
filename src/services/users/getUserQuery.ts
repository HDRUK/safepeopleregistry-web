import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUser from "./getUser";

export default function getUserQuery(userId: number, options?: QueryOptions) {
  const suspenseEnabled =
    options?.suspenseEnabled || options?.suspenseEnabled === undefined;

  return {
    queryKey: ["getUser", userId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      suspenseEnabled
        ? getUser(queryKey[1] as number, {
            error: {
              message: "getUserError",
            },
            ...options?.responseOptions,
          })
        : null,
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUser>>>;
}
