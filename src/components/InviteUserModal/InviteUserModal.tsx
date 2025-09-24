import { useTranslations } from "next-intl";
import InviteUser from "../../modules/InviteUser";
import FormModal, { FormModalProps } from "../FormModal";
import { Role } from "../../types/application";

interface InviteUserProps extends Omit<FormModalProps, "children"> {
  onSuccess?: () => void;
  projectRoles?: Partial<Role>[];
}

const NAMESPACE_TRANSLATION = "InviteUserModal";

export default function InviteUserModal({
  onSuccess,
  projectRoles,
  ...restProps
}: InviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <FormModal variant="content" description={t("description")} {...restProps}>
      <InviteUser onSuccess={onSuccess} projectRoles={projectRoles} />
    </FormModal>
  );
}
