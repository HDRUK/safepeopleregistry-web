import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getUsers from "@/app/actions/users/getUsers";
import { UsersResponse } from "./types";

type GetEntityUsersQuery<T = UsersResponse> = Partial<PaginatedQueryProps<T>>;

export default function usePaginatedUsersQuery({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetEntityUsersQuery = {}) {
  const queryKey = [queryKeyBase || "getUsers"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams,
    queryFn: queryParams =>
      getUsers(queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
