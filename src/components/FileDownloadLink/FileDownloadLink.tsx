import useFileDownload from "@/hooks/useFileDownload";
import { File } from "@/types/application";
import { Link } from "@mui/material";
import { downloadBlob } from "@/utils/file";
import { useTranslations } from "next-intl";

export interface FileDownloadLinkProps {
  file: File;
}

const NAMESPACE_TRANSLATION_FILE = "File";

export default function FileDownloadLink({ file }: FileDownloadLinkProps) {
  const { downloadFile } = useFileDownload(file.id);
  const t = useTranslations(NAMESPACE_TRANSLATION_FILE);

  const handledownloadFile = async () => {
    const { data } = await downloadFile();
    downloadBlob(data.blob, data.fileName);
  };

  return (
    <Link
      component="button"
      onClick={() => {
        handledownloadFile();
      }}>
      {t("FileDownloadText")}
    </Link>
  );
}
