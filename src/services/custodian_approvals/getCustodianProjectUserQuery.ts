import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUser from "@/app/actions/custodian_approvals/getCustodianProjectUser";

export default function getCustodianProjectUserQuery(
  custodianId: number,
  projectUserId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianProjectUser",
      Number(custodianId),
      Number(projectUserId),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianProjectUser(queryKey[1] as number, queryKey[2] as number, {
        error: {
          message: "getCustodianProjectUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianProjectUser>>>;
}
