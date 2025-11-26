import { MutateWithArgs, QueryOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import putProjectUsers from "./putProjectUsers";
import { PutProjectUsersPayload } from "./types";

type PutProjectUsersMutationArgs = MutateWithArgs<
  { id: number },
  PutProjectUsersPayload
>;

export default function putProjectUsersQuery(options?: QueryOptions) {
  return {
    mutationKey: ["postProjectUsers", ...(options?.queryKeySuffix || [])],
    mutationFn: ({ params, payload }: PutProjectUsersMutationArgs) => {
       if (!payload?.users || payload.users.length === 0) {
        return Promise.resolve();
      }
      return putProjectUsers(params.id, payload, {
        error: { message: "putProjectUsersError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof putProjectUsers>>,
    Error,
    PutProjectUsersMutationArgs
  >;
}
