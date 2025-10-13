import { ActionMenuItem } from "@/components/ActionMenu";
import FormModal from "@/components/FormModal";
import { EditIcon } from "@/consts/icons";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { putUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import EditDelegateForm, { DelegatesFormValues } from "./EditDelegateForm";

export interface EditDelegateProps {
  user: User;
  onSuccess: () => void;
}

const NAMESPACE_TRANSLATION = "Organisations.EditDelegate";

const EditDelegate = ({ user, onSuccess }: EditDelegateProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutateAsync: mutateDelegate, ...restMutateState } = useMutation(
    putUserQuery(user?.id as number)
  );

  const handleSubmit = async (fields: DelegatesFormValues) => {
    await mutateDelegate(fields);
  };

  useQueryAlerts(restMutateState, {
    onSuccess: () => {
      setOpenModal(false);

      onSuccess();
    },
    successAlertProps: {
      text: t("successAlertText"),
    },
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="errorAlertText" />,
    },
  });

  const { first_name, last_name, departments } = user;

  return (
    <>
      <ActionMenuItem
        sx={{ color: "secondary.main" }}
        onClick={() => setOpenModal(true)}
        icon={<EditIcon />}>
        {t("edit")}
      </ActionMenuItem>
      <FormModal
        heading={t("heading")}
        variant="form"
        open={openModal}
        onClose={(e: React.SyntheticEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenModal(false);
        }}>
        <EditDelegateForm
          defaultValues={{
            first_name,
            last_name,
            department_id: departments?.[0]?.id,
          }}
          onSubmit={handleSubmit}
          onClose={() => setOpenModal(false)}
          mutateState={restMutateState}
        />
      </FormModal>
    </>
  );
};

export default EditDelegate;
