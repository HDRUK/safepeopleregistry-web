import putValidationCheck from "@/app/actions/validation_checks/putValidationCheck";
import { PutValidationCheck } from "./types";

export default function putValidationCheckQuery() {
  return {
    mutationKey: ["putValidationCheckQuery"],
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: PutValidationCheck;
    }) =>
      putValidationCheck(id, payload, {
        error: {
          message: "putValidationCheckQueryError",
        },
      }),
  };
}
