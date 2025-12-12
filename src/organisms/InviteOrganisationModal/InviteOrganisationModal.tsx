import ButtonCancel from "@/components/ButtonCancel";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";
import InviteOrganisation from "../../modules/InviteOrganisation";
import { useMutation } from "@tanstack/react-query";
import { postOrganisationInviteUserQuery } from "@/services/organisations";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import useQueryAlerts from "@/hooks/useQueryAlerts";

interface InviteOrganisationModalProps
  extends Omit<FormModalProps, "children"> {
  onSuccess?: (id: number) => void;
  custodianId?: number;
}

const NAMESPACE_TRANSLATION = "Organisations.InviteOrganisation";

export default function InviteOrganisationModal({
  onSuccess,
  onClose,
  ...restProps
}: InviteOrganisationModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { queryState, handleSubmit } = useOrganisationInvite();

  useQueryAlerts(queryState, {
    onSuccess,
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
