import getProjectUser from "@/app/actions/project_users/getProjectUser";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getProjectUserQuery(
  id: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getProjectUser", id, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getProjectUser(queryKey[1] as number, {
        error: {
          message: "getProjectUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectUser>>>;
}
