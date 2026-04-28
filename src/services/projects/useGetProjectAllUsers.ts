import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getProjectAllUsers from "@/app/actions/projects/getProjectAllUsers";
import { ProjectAllUsersResponse } from "./types";

type GetPaginatedUsersQuery<T = ProjectAllUsersResponse> = Partial<
  PaginatedQueryProps<T>
>;

export default function useGetProjectAllUsers(
  projectId: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: GetPaginatedUsersQuery = {}
) {
  const queryKey = queryKeyBase || ["getUsers"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      // sort: `email:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getProjectAllUsers(projectId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
