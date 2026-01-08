import useQueryAlerts from "@/hooks/useQueryAlerts";
import EmailResetForm from "@/modules/EmailResetForm";
import putEmailChangeQuery from "@/services/keycloak/putEmailChangeQuery";
import { WithTranslations } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import FormModal, { FormModalProps } from "../../components/FormModal";
import { useTranslations } from "next-intl";

type EmailResetModalProps = Omit<FormModalProps, "children"> & {
  onSuccess?: () => void;
  userId: number;
};

const NAMESPACE_TRANSLATION = "Form.EmailReset";

export default function EmailResetModal({
  onSuccess,
  onClose,
  userId,
  ...restProps
}: EmailResetModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { mutateAsync, ...mutationState } = useMutation(putEmailChangeQuery());

  useQueryAlerts(mutationState, {
    onSuccess,
  });

  const handleSubmit = (payload: { email: string }) => {
    mutateAsync({
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
      <EmailResetForm
        t={t}
        onClose={onClose}
        onSubmit={handleSubmit}
        queryState={mutationState}
      />
    </FormModal>
  );
}
