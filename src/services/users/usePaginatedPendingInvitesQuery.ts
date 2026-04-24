import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getPendingInvitesQuery from "./getPendingInvitesQuery";
import { PendingInvitesResponse } from "./types";

type GetEntityUsersQuery<T = PendingInvitesResponse> = Partial<
  PaginatedQueryProps<T>
>;

export default function usePaginatedPendingInvitesQuery({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetEntityUsersQuery = {}) {
  const queryKey = [queryKeyBase || "getPendingInvites"];

  return usePaginatedQuery({
    ...getPendingInvitesQuery(),
    queryKeyBase: queryKey,
    defaultQueryParams,
    ...restParams,
  });
}
