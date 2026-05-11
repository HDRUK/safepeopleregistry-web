import postStartVeriff from "@/app/actions/veriff/postStartVeriff";
import { PostStartVeriffPayload } from "./types";

export default function postStartVeriffQuery() {
  return {
    mutationKey: ["postStartIdvtCheck"],
    mutationFn: (payload: PostStartVeriffPayload) => {
      return postStartVeriff(payload, {
        error: { message: "postStartIdvtCheckError" },
      });
    },
  };
}
