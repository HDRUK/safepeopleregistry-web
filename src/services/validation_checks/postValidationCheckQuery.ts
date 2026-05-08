import postValidationCheck from "@/app/actions/validation_checks/postValidationCheck";
import { PostValidationCheck } from "./types";

export default function postValidationCheckQuery() {
  return {
    mutationKey: ["putValidationCheckQuery"],
    mutationFn: (payload: PostValidationCheck) =>
      postValidationCheck(payload, {
        error: {
          message: "postValidationCheckQueryError",
        },
      }),
  };
}
