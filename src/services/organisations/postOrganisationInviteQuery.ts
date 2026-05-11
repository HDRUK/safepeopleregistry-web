import postOrganisationInvite from "@/app/actions/organisations/postOrganisationInvite";

export default function postOrganisationInviteQuery() {
  return {
    mutationKey: ["postOrganisationInvite"],
    mutationFn: (organisationId: number) => {
      return postOrganisationInvite(organisationId, {
        error: { message: "postOrganisationInviteError" },
      });
    },
  };
}
