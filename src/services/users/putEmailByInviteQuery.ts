import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putEmailByInvite from "./putEmailByInvite";
import { PutEmailByInvitePayload, PutEmailByInviteParams } from "./types";

export default function putEmailByInviteQuery(options?: QueryOptions) {
  return createMutation<
    ResponseJson<null>,
    PutEmailByInviteParams,
    PutEmailByInvitePayload
  >(
    {
      mutationKey: ["putSubsidiary"],
      mutationFn: ({ payload, params }) => {
        return putEmailByInvite(params.inviteCode, payload);
      },
    },
    options
  );
}
