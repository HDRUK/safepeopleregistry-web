import postResendInviteByOrganisation from "./postResendInviteByOrganisation";

export default function postResendInviteQuery() {
  return {
    mutationKey: ["postResendInviteByOrganisationQuery"],
    mutationFn: async (id: number) => {
      return postResendInviteByOrganisation(id, {
        error: { message: "postResendInviteByOrganisationQueryError" },
      });
    },
  };
}
