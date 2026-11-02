import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putCustodianAccessRevoked from "@/app/actions/custodians/putCustodianAccessRevoked";
import { PutCustodianAccessRevokedParams } from "./types";

export default function putCustodianAccessRevokedQuery(
  options?: MutationOptions
) {
  return createMutation<
    ResponseJson<boolean>,
    PutCustodianAccessRevokedParams,
    null
  >(
    {
      mutationKey: ["putCustodianAccessRevoked"],
      mutationFn: ({ params }, responseOptions) => {
        return putCustodianAccessRevoked(
          params?.custodianId as number,
          params?.custodianProjectUserId as number,
          responseOptions
        );
      },
    },
    options
  );
}
