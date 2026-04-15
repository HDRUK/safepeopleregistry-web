import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteCustodianProjectUser from "@/app/actions/custodian_approvals/deleteCustodianProjectUser";
import { DeleteCustodianProjectUserPayload } from "./types";

export default function deleteCustodianProjectUserQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "deleteCustodianProjectUser",
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: (payload: DeleteCustodianProjectUserPayload) => {
      return deleteCustodianProjectUser(payload.custodianId, payload.id, {
        error: { message: "deleteCustodianProjectUserError" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteCustodianProjectUser>>,
    Error,
    DeleteCustodianProjectUserPayload
  >;
}
