import getProjectForUser from "@/app/actions/projects/getProjectForUser";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getProjectForUserQuery(
  id: number,
  userId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getProjectForUser",
      id,
      userId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getProjectForUser(queryKey[1] as number, queryKey[2], {
        error: { message: "getProjectForUserError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectForUser>>>;
}
