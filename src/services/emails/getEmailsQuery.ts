import { Paged, QueryOptions, ResponseJson } from "../../types/requests";
import { createQuery } from "../../utils/query";
import getEmails from "./getEmails";
import { EmailsResponse } from "./types";

export default (options?: QueryOptions) =>
  createQuery<ResponseJson<Paged<EmailsResponse>>>(
    {
      queryKey: ["getEmails"],
      queryFn: async (
        searchParams: Record<string, string | number | undefined>,
        queryFnOptions
      ) => getEmails(searchParams, queryFnOptions),
    },
    options
  );
