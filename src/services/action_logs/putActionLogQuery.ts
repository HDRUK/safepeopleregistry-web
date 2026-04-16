import putActionLog from "@/app/actions/action_logs/putActionLog";
import { QueryOptions } from "@/types/requests";

export default function putActionLogQuery(options?: QueryOptions) {
  return {
    mutationKey: ["putActionLog"],
    mutationFn: (id: number) => {
      return putActionLog(id, {
        error: { message: "putActionLogError" },
        ...options,
      });
    },
  };
}
