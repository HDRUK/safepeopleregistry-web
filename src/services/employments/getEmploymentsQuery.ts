import getEmployments from "@/app/actions/employments/getEmployments";
import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";

export default function getEmploymentsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getEmployments",
      registryId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getEmployments(queryKey[1] as number, {
        error: { message: "getEmploymentsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getEmployments>>>;
}
