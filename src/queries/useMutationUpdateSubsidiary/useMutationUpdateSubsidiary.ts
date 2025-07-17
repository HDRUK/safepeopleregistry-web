import { useMutation } from "@tanstack/react-query";
import { Subsidiary } from "@/types/application";
import { postSubsidiary, putSubsidiary } from "../../services/subsidiaries";

type UpdateSubsidiary = Subsidiary | Partial<Subsidiary>;

interface MutationArgs {
  payload: UpdateSubsidiary;
  params: { subsidiaryId?: number; organisationId: number };
}

export default function useMutationUpdateSubsidiary() {
  return useMutation({
    mutationKey: ["updateSubsidiary"],
    mutationFn: (requestData: MutationArgs) => {
      const {
        payload,
        params: { subsidiaryId, organisationId },
      } = requestData;

      if (!subsidiaryId) {
        return postSubsidiary(organisationId, payload, {
          error: { message: "createSubsidiaryError" },
        });
      }

      return putSubsidiary(organisationId, subsidiaryId, payload, {
        error: { message: "updateSubsidiaryError" },
      });
    },
  });
}
