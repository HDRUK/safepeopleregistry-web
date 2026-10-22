import getOrganisationSroDeclaration from "@/app/actions/organisations/getOrganisationSroDeclaration";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { downloadBlob } from "@/utils/file";
import { Link } from "@mui/material";
import { useTranslations } from "next-intl";

export interface SroDeclarationDownloadLinkProps {
  organisationId: number;
}

const NAMESPACE_TRANSLATION = "SroDeclarationDownloadLink";

export default function SroDeclarationDownloadLink({
  organisationId,
}: SroDeclarationDownloadLinkProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { showAlert, hideAlert } = useAlertModal();

  const handleDownload = async () => {
    try {
      const { blob, fileName } =
        await getOrganisationSroDeclaration(organisationId);
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

  return (
    <Link component="button" onClick={handleDownload}>
      {t("linkText")}
    </Link>
  );
}
