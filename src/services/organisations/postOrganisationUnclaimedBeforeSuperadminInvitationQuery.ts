import postOrganisationUnclaimedBeforeSuperadminInvitation from "@/app/actions/organisations/postOrganisationUnclaimedBeforeSuperadminInvitation";
import { PostOrganisationUnclaimedBeforeSuperadminInvitationPayload } from "./types";

export default function postOrganisationUnclaimedBeforeSuperadminInvitationQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimedBeforeSuperadminInvitation"],
    mutationFn: async (
      payload: PostOrganisationUnclaimedBeforeSuperadminInvitationPayload
    ) => {
      return postOrganisationUnclaimedBeforeSuperadminInvitation(payload, {
        // Shares copy with the other unclaimed endpoint: from the inviter's
        // point of view both failures mean the same thing.
        error: { message: "postOrganisationUnclaimedError" },
      });
    },
  };
}
