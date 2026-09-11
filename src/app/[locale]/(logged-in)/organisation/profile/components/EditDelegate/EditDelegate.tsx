import { ActionMenuItem } from "@/components/ActionMenu";
import { EditIcon } from "@/consts/icons";
import { User } from "@/types/application";
import { useTranslations } from "next-intl";

export interface EditDelegateProps {
  user: User;
  onClick: (user: User) => void;
}

const NAMESPACE_TRANSLATION = "Organisations.EditDelegate";

const EditDelegate = ({ user, onClick }: EditDelegateProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <ActionMenuItem
      sx={{ color: "secondary.main" }}
      onClick={() => onClick(user)}
      icon={<EditIcon />}>
      {t("edit")}
    </ActionMenuItem>
  );
};

export default EditDelegate;
