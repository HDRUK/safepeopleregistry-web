import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { ProjectUsersResponse } from "./types";
import getProjectUsers from "@/app/actions/projects/getProjectUsers";

interface GetPaginatedCustodianProjectUsersQuery<T = ProjectUsersResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function useGetProjectUsers(
  projectId: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: GetPaginatedCustodianProjectUsersQuery = {}
) {
  const queryKey = [queryKeyBase || "getProjectUsers", projectId];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `email:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getProjectUsers(projectId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
