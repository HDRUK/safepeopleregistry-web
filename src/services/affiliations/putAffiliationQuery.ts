import putAffiliation from "@/app/actions/affiliations/putAffiliation";
import { PutAffiliationsPayload } from "./types";

export default function putAffiliationQuery() {
  return {
    mutationKey: ["putAffiliation"],
    mutationFn: ({
      affiliationId,
      payload,
    }: {
      affiliationId: number;
      payload: PutAffiliationsPayload;
    }) => {
      return putAffiliation(affiliationId, payload, {
        error: { message: "putAffiliationError" },
      });
    },
  };
}
