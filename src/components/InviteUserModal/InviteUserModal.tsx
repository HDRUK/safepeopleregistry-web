import { useTranslations } from "next-intl";
import InviteUser from "@/modules/InviteUser";
import FormModal, { FormModalProps } from "../FormModal";

interface InviteUserProps extends Omit<FormModalProps, "children"> {
  onSuccess?: () => void;
}

const NAMESPACE_TRANSLATION = "InviteUserModal";

export default function InviteUserModal({
  onSuccess,
  ...restProps
}: InviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <FormModal variant="content" description={t("description")} {...restProps}>
      <InviteUser onSuccess={onSuccess} />
    </FormModal>
  );
}
