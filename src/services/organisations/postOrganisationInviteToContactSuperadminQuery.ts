import postOrganisationInviteToContactSuperadmin from "@/app/actions/organisations/postOrganisationInviteToContactSuperadmin";
import { PostOrganisationInviteToContactSuperadminPayload } from "@/services/organisations/types";

export default function postOrganisationInviteToContactSuperadminQuery() {
  return {
    mutationKey: ["postOrganisationInviteToContactSuperadmin"],
    mutationFn: async ({
      organisationId,
      payload,
    }: {
      organisationId: number;
      payload: PostOrganisationInviteToContactSuperadminPayload;
    }) => {
      return postOrganisationInviteToContactSuperadmin(
        organisationId,
        payload,
        {
          error: { message: "postOrganisationInviteToContactSuperadminError" },
        }
      );
    },
  };
}
