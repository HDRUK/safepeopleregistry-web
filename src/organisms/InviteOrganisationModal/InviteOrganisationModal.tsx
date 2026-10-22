import ErrorMessage from "@/components/ErrorMessage";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { WithTranslations } from "@/types/application";
import { InviteOrganisationFormValues } from "@/types/form";
import { getOrganisationConflictErrorKey } from "@/utils/organisationConflictError";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";
import InviteOrganisation from "../../modules/InviteOrganisation";

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

type InviteOrganisationModalProps = WithTranslations<
  Omit<FormModalProps, "children"> & {
    onSuccess: (id: number) => void;
    custodianId?: number;
  }
>;

export default function InviteOrganisationModal({
  onSuccess,
  onClose,
  t,
  ...restProps
}: InviteOrganisationModalProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const { queryState, handleSubmit } = useOrganisationInvite();

  const conflictErrorKey = getOrganisationConflictErrorKey(queryState.error);

  useQueryAlerts(queryState, {
    errorAlertProps: conflictErrorKey && {
      text: <ErrorMessage t={tApplication} tKey={conflictErrorKey} />,
    },
  });

  const handleInvite = async (organisation: InviteOrganisationFormValues) => {
    const organisationId = await handleSubmit(organisation);

    if (organisationId !== undefined) {
      onSuccess(organisationId);
    }
  };

  return (
    <FormModal
      heading={t("heading")}
      variant="content"
      description={t("description")}
      onClose={onClose}
      {...restProps}>
      <InviteOrganisation
        t={t}
        onCancel={onClose}
        onSubmit={handleInvite}
        queryState={queryState}
      />
    </FormModal>
  );
}
