import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import InviteCustodian from "../InviteCustodian";
import useCustodianInvite from "../../queries/useCustodianInvite";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Custodian";

interface SendInviteOrganisationProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function SendInviteOrganisation({
  onSuccess,
  onError,
}: SendInviteOrganisationProps) {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert({
      severity: "error",
      text: <ErrorMessage t={t} tKey="inviteCustodianError" />,
      confirmButtonText: t("inviteCustodianErrorButton"),
      onConfirm: async () => {
        hideAlert();

        onError?.();
      },
    });
  };

  const handleSuccessAlert = () => {
    showAlert({
      severity: "success",
      text: t("inviteCustodianSuccess"),
      confirmButtonText: t("inviteCustodianSuccessButton"),
      onConfirm: async () => {
        hideAlert();

        onSuccess?.();
      },
    });
  };

  const { queryState, handleSubmit } = useCustodianInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteCustodian onSubmit={handleSubmit} queryState={queryState} />;
}
