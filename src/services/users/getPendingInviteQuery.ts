import { QueryOptions, ResponseJson } from "../../types/requests";
import { createQuery } from "../../utils/query";
import getPendingInvite from "./getPendingInvite";
import { PendingInviteResponse } from "./types";

export default (inviteCode: string, options?: QueryOptions) =>
  createQuery<ResponseJson<PendingInviteResponse>>(
    {
      queryKey: ["getPendingInvite", inviteCode],
      queryFn: async ({ queryKey }, queryFnOptions) =>
        getPendingInvite(queryKey[1] as string, queryFnOptions),
    },
    options
  );
