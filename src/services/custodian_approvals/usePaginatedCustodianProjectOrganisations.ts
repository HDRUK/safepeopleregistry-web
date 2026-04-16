import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianProjectOrganisations from "@/app/actions/custodian_approvals/getCustodianProjectOrganisations";
import { GetCustodianProjectOrganisationsResponse } from "./types";

type GetCustodiansUserProjectsQuery = Partial<
  PaginatedQueryProps<GetCustodianProjectOrganisationsResponse>
>;

export default function usePaginatedCustodianProjectOrganisations(
  custodianId: number,
  options?: GetCustodiansUserProjectsQuery
) {
  const queryKey =
    options?.queryKeyBase || "getPaginatedCustodianProjectOrganisations";
  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId],
    defaultQueryParams: {
      sort: `organisations.organisation_name:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianProjectOrganisations(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
