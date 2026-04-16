import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import postCustodianProject from "@/app/actions/custodians/postCustodianProject";
import { PostCustodianProjectPayload } from "./types";

type PostCustodianProjectMutationArgs = MutateWithArgs<
  { custodianId: number },
  PostCustodianProjectPayload
>;

export default function postCustodianProjectQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postCustodianProject", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PostCustodianProjectMutationArgs) => {
      return postCustodianProject(params.custodianId, payload, {
        error: { message: "postCustodianProjectError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof postCustodianProject>>,
    Error,
    PostCustodianProjectMutationArgs
  >;
}
