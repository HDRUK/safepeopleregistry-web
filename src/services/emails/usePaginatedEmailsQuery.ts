import usePaginatedQuery, {
  PaginatedQueryProps,
} from "../../hooks/usePaginatedQuery";
import getEmailsQuery from "./getEmailsQuery";
import { EmailsResponse } from "./types";

type GetPaginatedEmailsQuery<T = EmailsResponse> = Partial<
  PaginatedQueryProps<T>
>;

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
