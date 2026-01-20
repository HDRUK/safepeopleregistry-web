import ButtonCancel from "@/components/ButtonCancel";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import EmailChangeForm from "@/modules/EmailChangeForm";
import { putChangeEmailQuery } from "@/services/users";
import { EmailChangeFormValues } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";

interface EmailChangeModalProps extends Omit<FormModalProps, "children"> {
  onSuccess?: (result: string) => void;
  userId: number;
  defaultEmail: string;
}

const NAMESPACE_TRANSLATION = "Users.EmailChangeModal";

export default function EmailChangeModal({
  onSuccess,
  onClose,
  userId,
  defaultEmail,
  ...restProps
}: EmailChangeModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { showAlert } = useAlertModal();

  const { mutateAsync: changeEmailMutate, ...changeEmailState } = useMutation(
    putChangeEmailQuery({
      responseOptions: {
        suppressThrow: true,
      },
    })
  );

  useQueryAlerts(changeEmailState, {
    onSuccess,
    onError: modalProps => {
      showAlert({
        ...modalProps,
        ...(changeEmailState.error === "409Error" && {
          text: "This email cannot be used, please try another.",
        }),
      });
    },
    showOnlySuccess: true,
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
        defaultEmail={defaultEmail}
        queryState={changeEmailState}
        actions={<ButtonCancel onClick={onClose} />}
        onSubmit={handleSubmit}
      />
    </FormModal>
  );
}
