import { MutationOptions } from "@/types/requests";
import { UseMutationOptions } from "@tanstack/react-query";
import deleteProjectOrganisation from "@/app/actions/project_organisations/deleteProjectOrganisation";
import { DeleteProjectOrganisationPayload } from "./types";

export default function deleteProjectOrganisationQuery(
  options?: MutationOptions
) {
  return {
    mutationKey: [
      "deleteProjectOrganisation",
      ...(options?.mutationKeySuffix || []),
    ],
    mutationFn: (payload: DeleteProjectOrganisationPayload) => {
      return deleteProjectOrganisation(payload, {
        error: { message: "deleteProjectOrganisation" },
        ...options?.responseOptions,
      });
    },
    ...options,
  } as UseMutationOptions<
    Awaited<ReturnType<typeof deleteProjectOrganisation>>,
    Error,
    DeleteProjectOrganisationPayload
  >;
}
