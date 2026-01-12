import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putResendInviteSponorship from "./putResendInviteSponorship";
import { PutResendSponsorshipInviteParams } from "./types";

export default function putResendInviteSponorshipQuery(options?: QueryOptions) {
  return createMutation<
    ResponseJson<string>,
    PutResendSponsorshipInviteParams,
    null
  >(
    {
      mutationKey: ["putResendInviteSponorship"],
      mutationFn: ({ params }) => {
        return putResendInviteSponorship(params?.organisationId);
      },
    },
    options
  );
}
