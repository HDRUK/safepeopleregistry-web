import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "@/types/requests";
import getUserProjects from "@/app/actions/users/getUserProjects";

export default function getUserProjectsQuery(
  userId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getUserProjects", userId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getUserProjects(queryKey[1] as number, {
        error: {
          message: "getUserProjectsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUserProjects>>>;
}
