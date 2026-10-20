import { ChangeEvent } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import FileLink from "@/components/FileLink";
import {
  DEFAULT_ACCEPTED_DOCUMENT_FILE_EXTENSIONS,
  FileType,
} from "@/consts/files";
import { Grid } from "@mui/material";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { downloadFile } from "@/app/actions/files";
import { downloadBlob, getAcceptAttribute } from "@/utils/file";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import ErrorMessage from "@/components/ErrorMessage";

interface SroDeclarationUploaderProps {
  name: string;
  value?: number;
  onChange?: (value: number) => void;
}

const NAMESPACE_TRANSLATION = "Organisations.SroDeclarationUpload";

const SroDeclarationUploader = ({
  name,
  value,
  onChange,
}: SroDeclarationUploaderProps) => {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { showAlert, hideAlert } = useAlertModal();

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isTypeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload(`UploadFailed`, {
    initialFileId: value,
    allowedExtensions: DEFAULT_ACCEPTED_DOCUMENT_FILE_EXTENSIONS,
  });

  const uploadFile = useOrganisationFileUpload({
    organisation: organisation!,
    fileType: FileType.DECLARATION_SRO,
    upload,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = await uploadFile("", e);
    if (data?.id) {
      onChange?.(data.id);
    }
  };

  const handleDownload = async (fileId: number) => {
    try {
      const { blob, fileName } = await downloadFile(fileId);
      downloadBlob(blob, fileName);
    } catch {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={t} tKey="downloadError" />,
        confirmButtonText: t("downloadErrorButton"),
        onConfirm: async () => {
          hideAlert();
        },
      });
    }
  };

  // Files can only be downloaded once they've passed their scan.
  const onDownload =
    file && isScanComplete ? () => handleDownload(file.id) : undefined;

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid size={{ xs: 5 }}>
        <FileLink
          fileButtonText={file?.name ? t("buttonTextAlt") : t("buttonText")}
          message={`${FileType.CERTIFICATION}${name.toUpperCase()}`}
          fileNameText={file?.name}
          accept={getAcceptAttribute(DEFAULT_ACCEPTED_DOCUMENT_FILE_EXTENSIONS)}
          isSizeInvalid={isSizeInvalid}
          isTypeInvalid={isTypeInvalid}
          isScanning={isScanning}
          isScanComplete={isScanComplete}
          isScanFailed={isScanFailed}
          isUploading={isUploading}
          onFileChange={handleFileChange}
          onDownload={onDownload}
          includeStatus
        />
      </Grid>
    </Grid>
  );
};

export default SroDeclarationUploader;
