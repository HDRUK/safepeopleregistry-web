import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getAffiliations from "./getAffiliations";
import { GetAffiliationsResponse } from "./types";

type GetAffiliationsQuery = Partial<
  PaginatedQueryProps<GetAffiliationsResponse>
>;

export default function usePaginatedAffiliations(
  registryId: number,
  options?: GetAffiliationsQuery
) {
  const queryKey = [options?.queryKeyBase || "getAffiliations"];

  return usePaginatedQuery({
    queryKeyBase: [...queryKey, registryId],
    defaultQueryParams: {
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getAffiliations(registryId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
