import putCustodianActiveDecisionModel from "@/app/actions/custodians/putCustodianActiveDecisionModel";
import { PutCustodianActiveDecisionModelPayload } from "./types";

export default function putCustodianActiveDecisionModelQuery(
  custodianId: number | undefined
) {
  return {
    mutationKey: ["putCustodianActiveDecisionModel"],
    mutationFn: async (payload: PutCustodianActiveDecisionModelPayload) => {
      return putCustodianActiveDecisionModel(custodianId, payload, {
        error: { message: "putCustodianActiveDecisionModelError" },
      });
    },
  };
}
