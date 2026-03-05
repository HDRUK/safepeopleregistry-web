import { ChangeEvent } from "react";
import useFileUpload from "@/hooks/useFileUpload";
import FileLink from "@/components/FileLink";
import { FileType } from "@/consts/files";
import useOrganisationFileUpload from "@/hooks/useOrganisationFileUpload";
import { useStore } from "@/data/store";
import { capitaliseFirstLetter } from "@/utils/string";
import { useTranslations } from "next-intl";
import { downloadFile } from "@/services/files";

interface CertificationUploaderProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}
const NAMESPACE_TRANSLATION_CERT = "CertificationUpload";
const CertificationUploader = ({
  name,
  value,
  onChange,
}: CertificationUploaderProps) => {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_CERT);

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload(`certification${capitaliseFirstLetter(name)}UploadFailed`, {
    initialFileId: value,
  });

  const uploadFile = useOrganisationFileUpload({
    organisation: organisation!,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = await uploadFile(name, e);
    if (data?.id) {
      onChange(data.id);
    }
  };

  return (
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
  );
};

export default CertificationUploader;
