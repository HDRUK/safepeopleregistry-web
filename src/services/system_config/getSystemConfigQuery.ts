import getSystemConfig from "@/app/actions/system_config/getSystemConfig";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getSystemConfigQuery(options?: QueryOptions) {
  return {
    queryKey: ["getSystemConfig", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getSystemConfig({
        error: {
          message: "getSystemConfigError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getSystemConfig>>>;
}
