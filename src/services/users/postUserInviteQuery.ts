import postUserInvite from "./postUserInvite";
import { PostUserInvitePayload } from "./types";

export default function postUserInviteQuery() {
  return {
    mutationKey: ["postUserInvite"],
    mutationFn: (payload: PostUserInvitePayload) => {
      return postUserInvite(payload, {
        error: { message: "postUserInviteError" },
      });
    },
  };
}
