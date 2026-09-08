"use client";

import ErrorMessage from "@/components/ErrorMessage";
import FormModal from "@/components/FormModal";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { putUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import EditDelegateForm, { DelegatesFormValues } from "./EditDelegateForm";

export interface EditDelegateModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const NAMESPACE_TRANSLATION = "Organisations.EditDelegate";

const EditDelegateModal = ({
  user,
  open,
  onClose,
  onSuccess,
}: EditDelegateModalProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { mutateAsync: mutateDelegate, ...restMutateState } = useMutation(
    putUserQuery(user?.id as number)
  );

  const handleSubmit = async (fields: DelegatesFormValues) => {
    await mutateDelegate(fields);
  };

  useQueryAlerts(restMutateState, {
    onSuccess: () => {
      onClose();
      onSuccess();
    },
    successAlertProps: {
      text: t("successAlertText"),
    },
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="errorAlertText" />,
    },
  });

  return (
    <FormModal
      heading={t("heading")}
      variant="form"
      open={open}
      onClose={(e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}>
      <EditDelegateForm
        defaultValues={{
          first_name: user?.first_name ?? "",
          last_name: user?.last_name ?? "",
          department_id: user?.departments?.[0]?.id,
        }}
        onSubmit={handleSubmit}
        onClose={onClose}
        mutateState={restMutateState}
      />
    </FormModal>
  );
};

export default EditDelegateModal;
