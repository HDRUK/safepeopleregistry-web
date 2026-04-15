import putProjectUserPrimaryContact from "@/app/actions/projects/putProjectUserPrimaryContact";
import { PutPrimaryContactQuery } from "./types";

export default function putProjectUserPrimaryContactQuery() {
  return {
    mutationKey: ["putProjectUserPrimaryContact"],
    mutationFn: (payload: PutPrimaryContactQuery) => {
      const {
        projectId,
        registryId,
        primaryContact: primary_contact,
      } = payload;

      return putProjectUserPrimaryContact(
        projectId,
        registryId,
        { primary_contact },
        {
          error: {
            message: "submitError",
          },
        }
      );
    },
  };
}
