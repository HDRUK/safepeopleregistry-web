import { MutationOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import putAffiliationEndDate from "@/app/actions/affiliations/putAffiliationEndDate";
import {
  PutAffiliationEndDateParams,
  PutAffiliationEndDatePayload,
  PutAffiliationsResponse,
} from "./types";

export default function putAffiliationEndDateQuery(options?: MutationOptions) {
  return createMutation<
    ResponseJson<PutAffiliationsResponse>,
    PutAffiliationEndDateParams,
    PutAffiliationEndDatePayload
  >(
    {
      mutationKey: ["putAffiliationEndDate"],
      mutationFn: ({ params, payload }, responseOptions) => {
        return putAffiliationEndDate(
          params?.affiliationId as number,
          { to: payload?.to ?? null },
          responseOptions
        );
      },
    },
    options
  );
}
