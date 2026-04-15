import getPermissions from "@/app/actions/permissions/getPermissions";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getPermissionsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getPermissions", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getPermissions({
        error: {
          message: "getPermissionsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getPermissions>>>;
}
