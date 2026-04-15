import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import { PutResendSponsorshipInviteParams } from "./types";
import putResendInviteSponorship from "@/app/actions/projects/putResendInviteSponorship";

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
