import { UseMutationOptions } from "@tanstack/react-query";
import { MutateWithArgs, QueryOptions } from "../../types/requests";
import putProject from "./putProject";
import { PutProjectPayload } from "./types";

type PutProjectMutationArgs = MutateWithArgs<{ id: number }, PutProjectPayload>;

export default function putProjectQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putProject", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutProjectMutationArgs) => {
      return putProject(params.id, payload, {
        error: { message: "putProjectError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProject>>,
    Error,
    PutProjectMutationArgs
  >;
}
