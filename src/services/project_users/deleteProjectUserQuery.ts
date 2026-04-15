import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProjectUser from "@/app/actions/project_users/deleteProjectUser";
import { DeleteProjectUserPayload } from "./types";

export default function deleteProjectUserQuery(options?: MutationOptions) {
  return {
    mutationKey: ["deleteProjectUser", ...(options?.mutationKeySuffix || [])],
    mutationFn: (payload: DeleteProjectUserPayload) => {
      return deleteProjectUser(payload, {
        error: { message: "deleteProjectUser" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteProjectUser>>,
    Error,
    DeleteProjectUserPayload
  >;
}
