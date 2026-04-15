import postOrganisationInviteUser from "@/app/actions/organisations/postOrganisationInviteUser";
import { PostOrganisationInviteUserPayload } from "./types";

export default function postOrganisationInviteUserQuery() {
  return {
    mutationKey: ["postOrganisationInviteUser"],
    mutationFn: async ({
      organisationId,
      payload,
    }: {
      organisationId: number;
      payload: PostOrganisationInviteUserPayload;
    }) => {
      return postOrganisationInviteUser(organisationId, payload, {
        error: { message: "postOrganisationInviteUserError" },
      });
    },
  };
}
