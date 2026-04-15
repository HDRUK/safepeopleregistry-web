import postCustodianInvite from "../../app/actions/custodians/postCustodianInvite";

export default function postCustodianInviteQuery() {
  return {
    mutationKey: ["postCustodianInvite"],
    mutationFn: (custodianId: number) => {
      return postCustodianInvite(custodianId, {
        error: { message: "postCustodianInviteError" },
      });
    },
  };
}
