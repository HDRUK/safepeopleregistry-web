import putFeatureFlags from "@/app/actions/feature_flags/putFeatureFlags";
import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";

type PutFeatureFlagsQuerydMutationArgs = MutateWithArgs<
  { id: number },
  undefined
>;

export default function putFeatureFlagsQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postFeatureFlagsQuery", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params }: PutFeatureFlagsQuerydMutationArgs) => {
      return putFeatureFlags(params.id, {
        error: { message: "postFeatureFlagsError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putFeatureFlags>>,
    Error,
    PutFeatureFlagsQuerydMutationArgs
  >;
}
