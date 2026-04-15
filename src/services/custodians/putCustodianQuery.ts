import putCustodian from "../../app/actions/custodians/putCustodian";
import { PutCustodianPayload } from "./types";

export default function putCustodianQuery(id?: number) {
  return {
    mutationKey: ["putCustodian", id],
    mutationFn: (payload: PutCustodianPayload) =>
      putCustodian(id as number, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
