import { EntityType } from "@/types/api";
import { File, Organisation } from "@/types/application";
import { ChangeEvent, useCallback } from "react";
import { getFileFromEvent, resetFileFromEvent } from "../../utils/file";
import { FileType } from "../../consts/files";

export interface UseOrganisationFileUploadProps {
  fileType: FileType;
  organisation: Organisation;
  upload: (formData: FormData) => Promise<File | undefined>;
}

export default function useOrganisationFileUpload({
  fileType,
  organisation,
  upload,
}: UseOrganisationFileUploadProps) {
  return useCallback(
    async (name: string, e: ChangeEvent<HTMLInputElement>) => {
      const fileFromEvent = getFileFromEvent(e);
      const formData = new FormData();

      if (fileFromEvent) {
        formData.append("file", fileFromEvent);
        formData.append(
          "file_type",
          !name ? fileType : `${fileType}_${name.toUpperCase()}`
        );
        formData.append("entity_type", EntityType.ORGANISATION);
        formData.append("organisation_id", `${organisation?.id}`);

        const fileFromApi = await upload(formData);
        resetFileFromEvent(e);
        return fileFromApi;
      }

      return null;
    },
    [organisation?.id]
  );
}
