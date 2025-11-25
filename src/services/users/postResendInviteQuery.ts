import postResendInvite from "./postResendInvite";

export default function postResendInviteQuery() {
  return {
    mutationKey: ["postResendInviteQuery"],
    mutationFn: async (id: number) => {
      return postResendInvite(id, {
        error: { message: "postResendInviteQueryError" },
      });
    },
  };
}
