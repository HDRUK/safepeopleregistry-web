import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import { PostFeatureFlagsQueryPayload } from "./types";
import postFeatureFlags from "./postFeatureFlags";

type PostFeatureFlagsQuerydMutationArgs = MutateWithArgs<
  { id: number },
  PostFeatureFlagsQueryPayload
>;

export default function postFeatureFlagsQuery(options?: QueryOptions) {
  return {
    mutationKey: [
      "postFeatureFlagsQuery",
      ...(options?.queryKeySuffix || []),
    ],
    mutationFn: ({ params, payload }: PostFeatureFlagsQuerydMutationArgs) => {
      return postFeatureFlags(params.id, payload, {
        error: { message: "postFeatureFlagsError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postFeatureFlags>>,
    Error,
    PostFeatureFlagsQuerydMutationArgs
  >;
}
