import postCustodianInviteUser from "./postCustodianInviteUser";
import { PostOrganisationInviteUserPayload } from "./types";

export default function postCustodianInviteUserQuery() {
  return {
    mutationKey: ["postCustodianInviteUser"],
    mutationFn: async ({
      organisationId,
      payload,
    }: {
      organisationId: number;
      payload: PostOrganisationInviteUserPayload;
    }) => {
      return postCustodianInviteUser(organisationId, payload, {
        error: { message: "postCustodianInviteUserError" },
      });
    },
  };
}
