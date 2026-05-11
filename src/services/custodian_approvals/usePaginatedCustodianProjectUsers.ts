import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianProjectUsers from "@/app/actions/custodian_approvals/getCustodianProjectUsers";
import { GetCustodianProjectUsersResponse } from "./types";

type GetCustodiansUserProjectsQuery = Partial<
  PaginatedQueryProps<GetCustodianProjectUsersResponse>
>;

export default function usePaginatedCustodianProjectUsers(
  custodianId: number,
  options?: GetCustodiansUserProjectsQuery
) {
  const queryKey = options?.queryKeyBase || "getPaginatedCustodianProjectUsers";

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId],
    defaultQueryParams: {
      sort: `projects.title:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianProjectUsers(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
