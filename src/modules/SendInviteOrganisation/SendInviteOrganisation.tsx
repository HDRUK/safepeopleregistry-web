import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import InviteOrganisation from "../InviteOrganisation";
import useOrganisationInvite from "@/queries/useOrganisationInvite/useOrganisationInvite";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";
const NAMESPACE_TRANSLATIONS_FORM = "Form";

interface SendInviteOrganisationProps {
  onSuccess?: () => void;
  onError?: () => void;
  actions?: ReactNode;
}

export default function SendInviteOrganisation({
  onSuccess,
  onError,
  actions,
}: SendInviteOrganisationProps) {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATIONS_FORM);

  const handleErrorAlert = () => {
    showAlert({
      severity: "error",
      text: <ErrorMessage t={t} tKey="inviteOrganisationError" />,
      confirmButtonText: t("inviteOrganisationErrorButton"),
      onConfirm: async () => {
        hideAlert();

        onError?.();
      },
    });
  };

  const handleSuccessAlert = () => {
    showAlert({
      severity: "success",
      text: t("inviteOrganisationSuccess"),
      confirmButtonText: t("inviteOrganisationSuccessButton"),
      onConfirm: async () => {
        hideAlert();

        onSuccess?.();
      },
    });
  };

  const { queryState, handleSubmit } = useOrganisationInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return (
    <InviteOrganisation
      onSubmit={async organisation => {
        await handleSubmit(organisation);
      }}
      queryState={queryState}
      onCancel={actions?.onCancel}
      t={tForm}
    />
  );
}
