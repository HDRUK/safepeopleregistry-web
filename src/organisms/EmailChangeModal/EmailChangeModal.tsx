import ButtonCancel from "@/components/ButtonCancel";
import EmailChangeForm from "@/modules/EmailChangeForm";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putChangeEmailQuery } from "@/services/users";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { EmailChangeFormValues } from "@/types/form";
import { checkEmailExists } from "@/utils/query";

interface EmailChangeModalProps extends Omit<FormModalProps, "children"> {
  onSuccess?: (result: string) => void;
  userId: number;
}

const NAMESPACE_TRANSLATION = "Users.EmailChangeModal";

export default function EmailChangeModal({
  onSuccess,
  onClose,
  userId,
  ...restProps
}: EmailChangeModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const { mutateAsync: changeEmailMutate, ...changeEmailState } = useMutation(
    putChangeEmailQuery()
  );

  useQueryAlerts(changeEmailState, {
    onSuccess,
  });

  const handleSubmit = async (payload: EmailChangeFormValues) => {
    await changeEmailMutate({
      params: {
        id: userId,
      },
      payload,
    });
  };

  return (
    <FormModal
      component="div"
      heading={t("heading")}
      variant="content"
      description={t("description")}
      onClose={onClose}
      {...restProps}>
      <EmailChangeForm
        t={t}
        queryState={changeEmailState}
        actions={<ButtonCancel onClick={onClose} />}
        onSubmit={handleSubmit}
        validateEmail={async (email: string) => {
          return await checkEmailExists(queryClient, email);
        }}
      />
    </FormModal>
  );
}
