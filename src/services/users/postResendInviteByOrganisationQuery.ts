import postResendInviteByOrganisation from "@/app/actions/users/postResendInviteByOrganisation";

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
