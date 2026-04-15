import getUserValidatedProjects from "@/app/actions/projects/getUserValidatedProjects";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getUserValidatedProjectsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getUserValidatedProjects",
      registryId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getUserValidatedProjects(queryKey[1] as number, {
        error: { message: "getUserValidatedProjectsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUserValidatedProjects>>>;
}
