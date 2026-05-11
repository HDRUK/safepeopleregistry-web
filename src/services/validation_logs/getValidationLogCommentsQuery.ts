import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getValidationLogComments from "@/app/actions/validation_logs/getValidationLogComments";

export default function getValidationLogCommentsQuery(
  validationLogId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getValidationLogComments",
      validationLogId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getValidationLogComments(queryKey[1] as number, {
        error: { message: "getValidationLogCommentsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getValidationLogComments>>>;
}
