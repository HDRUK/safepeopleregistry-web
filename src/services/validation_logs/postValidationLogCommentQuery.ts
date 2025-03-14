import postValidationLogComment from "./postValidationLogComment";
import { PostValidationLogCommentPayload } from "./types";

export default function postValidationLogCommentQuery() {
  return {
    mutationKey: ["postValidationLogComment"],
    mutationFn: (payload: PostValidationLogCommentPayload) =>
      postValidationLogComment(payload, {
        error: {
          message: "postValidationLogCommentError",
        },
      }),
  };
}
