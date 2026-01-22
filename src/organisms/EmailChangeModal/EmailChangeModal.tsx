import ButtonCancel from "@/components/ButtonCancel";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import EmailChangeForm from "@/modules/EmailChangeForm";
import { putChangeEmailQuery } from "@/services/users";
import { EmailChangeFormValues } from "@/types/form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../../components/FormModal";

interface EmailChangeModalProps extends Omit<FormModalProps, "children"> {
  onSuccess?: () => void;
  onUpdateError?: () => void;
  onUpdated?: (email: string) => void;
  userId: number;
  defaultEmail: string;
}

const NAMESPACE_TRANSLATION = "Users.EmailChangeModal";

export default function EmailChangeModal({
  onSuccess,
  onUpdateError,
  onUpdated,
  onClose,
  userId,
  defaultEmail,
  ...restProps
}: EmailChangeModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { mutateAsync: changeEmailMutate, ...changeEmailState } = useMutation(
    putChangeEmailQuery({
      noErrorKey: true,
    })
  );

  useQueryAlerts(changeEmailState, {
    ...(changeEmailState.error === "409Error" && {
      errorAlertProps: {
        text: t(changeEmailState.error),
      },
    }),
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const handleSubmit = async (payload: EmailChangeFormValues) => {
    try {
      await changeEmailMutate({
        params: {
          id: userId,
        },
        payload,
      });

      onUpdated?.(payload.email);
    } catch (_) {
      onUpdateError?.();
    }
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
        mutateState={changeEmailState}
        actions={<ButtonCancel onClick={onClose} />}
        onSubmit={handleSubmit}
      />
    </FormModal>
  );
}
