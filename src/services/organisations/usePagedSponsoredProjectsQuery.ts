import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getSponsoredProjects from "./getSponsoredProjects";
import { GetProjectsResponse } from "./types";

interface PagedSponsoredProjectsQuery<T = GetProjectsResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function usePagedSponsoredProjectsQuery(
  id: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: PagedSponsoredProjectsQuery = {}
) {
  const queryKey = [queryKeyBase || "getSponsoredProjects"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams,
    queryFn: queryParams =>
      getSponsoredProjects(id, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
