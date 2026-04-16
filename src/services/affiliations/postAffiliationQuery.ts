import { User } from "@/types/application";
import postAffiliation from "@/app/actions/affiliations/postAffiliation";
import { PostAffiliationPayload } from "./types";

export default function postAffiliationQuery(user: User) {
  return {
    mutationKey: ["postAffiliation", user?.id],
    mutationFn: (payload: PostAffiliationPayload) => {
      return postAffiliation(user?.registry_id, payload, {
        error: { message: "postAffiliationError" },
      });
    },
  };
}
