import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/ErrorMessage";
import InviteCustodian from "../InviteCustodian";
import useCustodianInvite from "../../queries/useCustodianInvite";
import { showAlert } from "../../utils/showAlert";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Custodian";

export default function SendInviteOrganisation() {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert({
      severity: "error",
      text: <ErrorMessage t={t} tKey="inviteCustodianError" />,
      confirmButtonText: t("inviteCustodianErrorButton"),
      onConfirm: async () => {
        hideAlert();
      },
    });
  };

  const handleSuccessAlert = () => {
    showAlert({
      severity: "success",
      text: t("inviteCustodianSuccess"),
      confirmButtonText: t("inviteCustodianSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useCustodianInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteCustodian onSubmit={handleSubmit} queryState={queryState} />;
}
