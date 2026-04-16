import putValidationLog from "@/app/actions/validation_logs/putValidationLog";
import { ValidationLogAction } from "./types";

export default function putValidationLogQuery(logId: number) {
  return {
    mutationKey: ["putValidationLogQuery"],
    mutationFn: (action: ValidationLogAction) =>
      putValidationLog(logId, action, {
        error: {
          message: "putValidationLogQueryError",
        },
      }),
  };
}
