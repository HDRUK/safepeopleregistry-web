import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianUsers from "./getCustodianUsers";
import { GetCustodianOrganisationUsersResponse } from "./types";

type GetCustodianOrganisationUsersQuery = Partial<
  PaginatedQueryProps<GetCustodianOrganisationUsersResponse>
>;

export default function usePaginatedCustodianUsers(
  custodianId: number,
  options?: GetCustodianOrganisationUsersQuery
) {
  const queryKey = options?.queryKeyBase || "getCustodianUsers";

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId],
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianUsers(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
