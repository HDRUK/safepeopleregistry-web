import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianUser from "@/app/actions/custodian_users/getCustodianUser";

export default function getCustodianUserQuery(
  custodianUserId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianUser",
      custodianUserId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianUser(queryKey[1] as number, {
        error: {
          message: "getCustodianUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianUser>>>;
}
