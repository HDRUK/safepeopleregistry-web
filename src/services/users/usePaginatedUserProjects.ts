import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { omit } from "@/utils/json";
import getUserProjects from "@/app/actions/users/getUserProjects";
import { GetUserProjectsResponse } from "./types";

type GetUserProjectsQuery = Partial<
  PaginatedQueryProps<GetUserProjectsResponse>
>;

export default function usePaginatedUserProjects(
  userId: number,
  options?: GetUserProjectsQuery
) {
  const queryKey = [options?.queryKeyBase || "getUsers"];

  return usePaginatedQuery({
    queryKeyBase: [queryKey, userId],
    defaultQueryParams: {
      sort: `title:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getUserProjects(userId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
