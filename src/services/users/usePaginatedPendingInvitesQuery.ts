import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getPendingInvitesQuery from "./getPendingInvitesQuery";
import { PendingInvitesResponse } from "./types";

interface GetEntityUsersQuery<T = PendingInvitesResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function usePaginatedPendingInvitesQuery({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetEntityUsersQuery = {}) {
  const queryKey = [queryKeyBase || "getPendingInvites"];
  console.log(defaultQueryParams, "defaultQueryParams");

  return usePaginatedQuery({
    ...getPendingInvitesQuery(),
    queryKeyBase: queryKey,
    defaultQueryParams,
    ...restParams,
  });
}
