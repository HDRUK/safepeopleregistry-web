import putAccreditations from "@/app/actions/accreditations/putAccreditations";
import { PutAccreditationsPayload } from "./types";

export default function putAccreditationsQuery(registryId: number) {
  return {
    mutationKey: ["putAccreditationsQuery", registryId],
    mutationFn: (payload: PutAccreditationsPayload & { id: number }) =>
      putAccreditations(payload.id, registryId, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
