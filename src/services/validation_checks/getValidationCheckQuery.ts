import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getValidationCheck from "@/app/actions/validation_checks/getValidationCheck";

export default function getValidationCheckQuery(
  validationCheckId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getValidationCheck",
      validationCheckId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getValidationCheck(queryKey[1] as number, {
        error: { message: "getValidationCheckError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getValidationCheck>>>;
}
