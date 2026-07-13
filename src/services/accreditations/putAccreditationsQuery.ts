import putAccreditations from "@/app/actions/accreditations/putAccreditations";
import { PutAccreditationsPayload } from "./types";

export default function putAccreditationsQuery(registryId: number) {
  return {
    mutationKey: ["putAccreditationsQuery", registryId],
    mutationFn: (payload: PutAccreditationsPayload) =>
      putAccreditations(registryId, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
