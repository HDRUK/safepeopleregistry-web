import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postSubsidiary from "@/app/actions/subsidiaries/postSubsidiary";
import { PostSubsidiaryPayload } from "./types";

type PostSubsidiaryMutationArgs = MutateWithArgs<
  { id: number },
  PostSubsidiaryPayload
>;

export default function postSubsidiaryQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postSubsidiary", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PostSubsidiaryMutationArgs) => {
      return postSubsidiary(params.id, payload, {
        error: { message: "postSubsidiaryError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postSubsidiary>>,
    Error,
    PostSubsidiaryMutationArgs
  >;
}
