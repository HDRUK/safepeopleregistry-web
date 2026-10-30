import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getCustodianAccessRevocations from "@/app/actions/custodians/getCustodianAccessRevocations";
import { GetCustodianAccessRevocationsResponse } from "./types";

type GetCustodianAccessRevocationsQuery = Partial<
  PaginatedQueryProps<GetCustodianAccessRevocationsResponse>
>;

export default function usePaginatedCustodianAccessRevocations(
  custodianId: number,
  options?: GetCustodianAccessRevocationsQuery
) {
  const queryKey = [options?.queryKeyBase || "getCustodianAccessRevocations"];

  return usePaginatedQuery({
    queryKeyBase: [...queryKey, custodianId],
    defaultQueryParams: {
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianAccessRevocations(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
