import getEmails from "@/app/actions/emails/getEmails";
import { Paged, QueryOptions, ResponseJson } from "../../types/requests";
import { createQuery } from "../../utils/query";
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
