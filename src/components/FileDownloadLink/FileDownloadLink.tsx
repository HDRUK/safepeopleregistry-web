import useFileDownload from "@/hooks/useFileDownload";
import { File } from "@/types/application";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";

export interface FileDownloadLinkProps {
  file: File;
}

export default function FileDownloadLink({ file }: FileDownloadLinkProps) {
  const { downloadFile } = useFileDownload(file.id);

  return (
    <Button
      component={Link}
      onClick={() => {
        downloadFile();
      }}>
      {file.name}
    </Button>
  );
}
