import { QueryOptions, ResponseJson } from "@/types/requests";
import { createMutation } from "@/utils/query";
import patchSponsorshipStatus from "./patchSponorshipStatus";
import {
  PatchSponsorshipStatusParams,
  PatchSponsorshipStatusPayload,
} from "./types";

export default function patchSponsorshipStatusQuery(options?: QueryOptions) {
  return createMutation<
    ResponseJson<string>,
    PatchSponsorshipStatusParams,
    PatchSponsorshipStatusPayload
  >(
    {
      mutationKey: ["patchSponsorshipStatus"],
      mutationFn: ({ params, payload }) => {
        return patchSponsorshipStatus(params?.organisationId, payload);
      },
    },
    options
  );
}
