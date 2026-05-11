import getProjectRoles from "@/app/actions/project_roles/getProjectRoles";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getProjectRolesQuery(options?: QueryOptions) {
  return {
    queryKey: ["getProjectRoles", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getProjectRoles({
        error: {
          message: "getProjectRolesError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectRoles>>>;
}
