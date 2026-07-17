import postAccreditations from "@/app/actions/accreditations/postAccreditations";
import { PostAccreditationsPayload } from "./types";

export default function postAccreditationsQuery(registryId: number) {
  return {
    mutationKey: ["postAccreditations", registryId],
    mutationFn: (payload: PostAccreditationsPayload) => {
      return postAccreditations(registryId, payload, {
        error: { message: "postAccreditationError" },
      });
    },
  };
}
