import putCustodianActiveEntityModel from "@/app/actions/custodians/putCustodianActiveEntityModel";
import { PutCustodianActiveEntityModelPayload } from "./types";

export default function putCustodianActiveEntityModelQuery(
  custodianId: number | undefined
) {
  return {
    mutationKey: ["putCustodianActiveEntityModel"],
    mutationFn: async (payload: PutCustodianActiveEntityModelPayload) => {
      return putCustodianActiveEntityModel(custodianId, payload, {
        error: { message: "putCustodianActiveEntityModelError" },
      });
    },
  };
}
