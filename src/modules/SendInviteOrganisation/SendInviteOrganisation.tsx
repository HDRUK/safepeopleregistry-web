import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import InviteOrganisation from "../InviteOrganisation";
import useOrganisationInvite from "@/queries/useOrganisationInvite/useOrganisationInvite";
import { Organisation } from "@/types/application";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";
const NAMESPACE_TRANSLATIONS_FORM = "Form";

export interface SendInviteOrganisationProps {
  onSuccess?: () => void;
  onError?: () => void;
  actions?: ReactNode;
  organisation?: Organisation;
}

export default function SendInviteOrganisation({
  onSuccess,
  onError,
  actions,
  organisation,
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
    organisation,
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return (
    <InviteOrganisation
      onSubmit={async organisation => {
        await handleSubmit(organisation);
      }}
      queryState={queryState}
      defaultValues={
        organisation && {
          organisation_name: organisation.organisation_name,
          lead_applicant_email: organisation.lead_applicant_email || "",
        }
      }
      onCancel={actions?.onCancel}
      t={tForm}
    />
  );
}
