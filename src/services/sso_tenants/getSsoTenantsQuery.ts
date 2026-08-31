import getSsoTenants from "@/app/actions/sso_tenants/getSsoTenants";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getSsoTenantsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSsoTenants", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getSsoTenants({
        error: { message: "getSsoTenantsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getSsoTenants>>>;
}
