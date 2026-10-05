import useFileDownload from "@/hooks/useFileDownload";
import { File } from "@/types/application";
import { Link } from "@mui/material";

export interface FileDownloadLinkProps {
  file: File;
}

export default function FileDownloadLink({ file }: FileDownloadLinkProps) {
  const { downloadFile } = useFileDownload(file.id);
  console.log("file", file);

    const handledownloadFile = async () => {
    const { data } = await downloadFile();
    if (data) {
      const blob = new Blob([data.blob], { type: data.contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
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
