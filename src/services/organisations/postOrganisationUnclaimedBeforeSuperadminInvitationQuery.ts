import postOrganisationUnclaimedBeforeSuperadminInvitation from "@/app/actions/organisations/postOrganisationUnclaimedBeforeSuperadminInvitation";
import { assertOrganisationResponseOk } from "@/utils/organisationConflictError";
import { PostOrganisationUnclaimedBeforeSuperadminInvitationPayload } from "./types";

export default function postOrganisationUnclaimedBeforeSuperadminInvitationQuery() {
  return {
    mutationKey: ["postOrganisationUnclaimedBeforeSuperadminInvitation"],
    mutationFn: async (
      payload: PostOrganisationUnclaimedBeforeSuperadminInvitationPayload
    ) => {
      const response =
        await postOrganisationUnclaimedBeforeSuperadminInvitation(payload, {
          suppressThrow: true,
          // Shares copy with the other unclaimed endpoint: from the inviter's
          // point of view both failures mean the same thing.
          error: { message: "postOrganisationUnclaimedError" },
        });

      return assertOrganisationResponseOk(
        response,
        "postOrganisationUnclaimedError"
      );
    },
  };
}
