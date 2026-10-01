import useSroDeclarationDownload from "../../hooks/useSroDeclarationDownload/useSroDeclarationDownload";

export interface SroDeclarationDownloadLinkProps {
  organisationId: number;
}
export default function sroDeclarationDownloadLink({
  organisationId,
}: SroDeclarationDownloadLinkProps) {
  const { sroDeclarationDownload } = useSroDeclarationDownload(organisationId);

  const handleDownload = async () => {
    const { data } = await sroDeclarationDownload();
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
    <a
      href="#"
      onClick={() => {
        handleDownload();
      }}>
      Download SRO Declaration form
    </a>
  );
}
