import useQueryAlerts from "@/hooks/useQueryAlerts";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { WithTranslations } from "@/types/application";
import { InviteOrganisationFormValues } from "@/types/form";
import FormModal, { FormModalProps } from "../../components/FormModal";
import InviteOrganisation from "../../modules/InviteOrganisation";

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
  const { queryState, handleSubmit } = useOrganisationInvite();

  useQueryAlerts(queryState);

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
