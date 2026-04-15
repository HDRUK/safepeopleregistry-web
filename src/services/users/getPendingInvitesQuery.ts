import getPendingInvites from "@/app/actions/users/getPendingInvites";
import { QueryOptions, ResponseJson } from "../../types/requests";
import { createQuery } from "../../utils/query";
import { PendingInvitesResponse } from "./types";

export default (options?: QueryOptions) =>
  createQuery<ResponseJson<PendingInvitesResponse>>(
    {
      queryKey: ["getPendingInvites"],
      queryFn: async (
        searchParams: Record<string, string | number | undefined>,
        queryFnOptions
      ) => getPendingInvites(searchParams, queryFnOptions),
    },
    options
  );
