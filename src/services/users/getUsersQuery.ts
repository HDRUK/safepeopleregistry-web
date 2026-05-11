import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUsers from "@/app/actions/users/getUsers";

export default function getUsersQuery(options?: QueryOptions) {
  return {
    queryKey: ["getUsers", ...(options?.queryKeySuffix || [])],
    queryFn: (searchParams: Record<string, string | number | undefined>) =>
      getUsers(searchParams, {
        error: {
          message: "getUsersError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>>;
}
