import useQueryAlerts from "@/hooks/useQueryAlerts";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { WithTranslations } from "@/types/application";
import FormModal, { FormModalProps } from "../../components/FormModal";
import InviteOrganisation from "../../modules/InviteOrganisation";

type InviteOrganisationModalProps = WithTranslations<
  Omit<FormModalProps, "children"> & {
    onSuccess?: (id: number) => void;
    custodianId?: number;
  }
>;

export default function InviteOrganisationModal({
  onSuccess,
  onClose,
  t,
  ...restProps
}: InviteOrganisationModalProps) {
  const { queryState, data, handleSubmit } = useOrganisationInvite();

  useQueryAlerts(queryState, {
    onSuccess: () => onSuccess(data?.data),
  });

  return (
    <FormModal
      heading={t("heading")}
      variant="content"
      description={t("description")}
      onClose={onClose}
      {...restProps}>
      <InviteOrganisation
        t={t}
        onSubmit={handleSubmit}
        queryState={queryState}
      />
    </FormModal>
  );
}
