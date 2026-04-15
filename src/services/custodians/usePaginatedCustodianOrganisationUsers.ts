import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianOrganisationUsers from "../../app/actions/custodians/getCustodianOrganisationUsers";
import { GetCustodianOrganisationUsersResponse } from "./types";

type GetCustodianOrganisationUsersQuery = Partial<
  PaginatedQueryProps<GetCustodianOrganisationUsersResponse>
>;

export default function usePaginatedCustodianOrganisationUsers(
  custodianId: number,
  organisationId: number,
  options?: GetCustodianOrganisationUsersQuery
) {
  const queryKey = [options?.queryKeyBase || "getCustodianOrganisations"];

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId, organisationId],
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianOrganisationUsers(custodianId, organisationId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
