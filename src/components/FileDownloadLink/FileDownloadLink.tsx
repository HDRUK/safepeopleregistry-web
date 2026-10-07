import useFileDownload from "@/hooks/useFileDownload";
import { File } from "@/types/application";
import { Link } from "@mui/material";
import { downloadBlob } from "@/utils/file";

export interface FileDownloadLinkProps {
  file: File;
}

export default function FileDownloadLink({ file }: FileDownloadLinkProps) {
  const { downloadFile } = useFileDownload(file.id);

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
      Download File
    </Link>
  );
}
