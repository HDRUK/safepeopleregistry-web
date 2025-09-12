import useFileDownload from "@/hooks/useFileDownload";
import { File } from "@/types/application";
import { Link } from "@mui/material";

export interface FileDownloadLinkProps {
  file: File;
}

export default function FileDownloadLink({ file }: FileDownloadLinkProps) {
  const { downloadFile } = useFileDownload(file.id);

  return (
    <Link
      component="button"
      onClick={() => {
        downloadFile();
      }}>
      {file.name}
    </Link>
  );
}
