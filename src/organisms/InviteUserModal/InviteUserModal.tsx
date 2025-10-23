import ButtonCancel from "@/components/ButtonCancel";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";
import InviteUser from "../../modules/InviteUser";
import { Role } from "../../types/application";

interface InviteUserProps extends Omit<FormModalProps, "children"> {
  onSuccess?: (id: number, roleId: number) => void;
  projectRoles?: Partial<Role>[];
  organisationId?: number;
  custodianId?: number;
}

const NAMESPACE_TRANSLATION = "InviteUserModal";

export default function InviteUserModal({
  onSuccess,
  onClose,
  organisationId,
  custodianId,
  projectRoles,
  ...restProps
}: InviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <FormModal
      heading={t("heading")}
      variant="content"
      description={t("description")}
      onClose={onClose}
      {...restProps}>
      <InviteUser
        actions={<ButtonCancel onClick={onClose} />}
        onSuccess={onSuccess}
        projectRoles={projectRoles}
        organisationId={organisationId}
        custodianId={custodianId}
      />
    </FormModal>
  );
}
