import { ChangeEvent } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import { Grid } from "@mui/material";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { downloadFile } from "@/services/files";

interface SroDeclarationUploaderProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

const NAMESPACE_TRANSLATION = "Organisations.SroDeclaratationUpload";

const SroDeclarationUploader = ({
  name,
  value,
  onChange,
}: SroDeclarationUploaderProps) => {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload(`UploadFailed`, {
    initialFileId: value,
  });

  const uploadFile = useOrganisationFileUpload({
    organisation: organisation!,
    fileType: FileType.DECLARATION,
    upload,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = await uploadFile(name, e);
    if (data?.id) {
      onChange(data.id);
    }
  };

  return (
    <Grid container item spacing={3} sx={{ mt: 1 }}>
      <Grid item xs={4}>
        <FileLink
          fileButtonText={file?.name ? t("buttonTextAlt") : t("buttonText")}
          message={`${FileType.CERTIFICATION}${name.toUpperCase()}`}
          fileNameText={file?.name}
          isSizeInvalid={isSizeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
          onFileChange={handleFileChange}
          onDownload={() => downloadFile(file?.id as number)}
          includeStatus
        />
      </Grid>
    </Grid>
  );
};

export default SroDeclarationUploader;
