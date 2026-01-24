import usePaginatedQuery, {
  PaginatedQueryProps,
} from "../../hooks/usePaginatedQuery";
import getEmailsQuery from "./getEmailsQuery";
import { EmailsResponse } from "./types";

interface GetPaginatedEmailsQuery<T = EmailsResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function usePaginatedEmailsQuery({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetPaginatedEmailsQuery = {}) {
  const queryKey = [queryKeyBase || "getEmails"];

  return usePaginatedQuery({
    ...getEmailsQuery(),
    queryKeyBase: queryKey,
    defaultQueryParams,
    ...restParams,
  });
}
