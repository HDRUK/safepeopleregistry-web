import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getProjectUsers from "./getProjectUsers";
import { ProjectUsersResponse } from "./types";

interface GetEntityOrganisationsQuery<T = ProjectUsersResponse> extends Partial<
  PaginatedQueryProps<T>
> {}

export default function useProjectUsersQuery(
  id: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: GetEntityOrganisationsQuery = {}
) {
  const queryKey = [queryKeyBase || "getProjectUsers", id];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `last_name:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getProjectUsers(id, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
