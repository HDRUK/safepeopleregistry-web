import ButtonSave from "@/components/ButtonSave";
import FormActions from "@/components/FormActions";
import { WithTranslations } from "@/types/application";
import { TextField } from "@mui/material";
import { ReactNode, useMemo } from "react";
import Form from "../../components/Form";
import FormControlWrapper from "../../components/FormControlWrapper";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import { EmailChangeFormValues, WithMutationState } from "../../types/form";

export type EmailChangeFormProps = WithMutationState<
  WithTranslations<{
    onSubmit?: (fields: EmailChangeFormValues) => void;
    actions: ReactNode;
    defaultEmail?: string;
  }>
>;

export default function EmailChangeForm({
  actions,
  onSubmit,
  defaultEmail,
  mutateState,
  t,
}: EmailChangeFormProps) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t("emailFormatInvalid"))
          .required(t("emailRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      email: defaultEmail,
    },
  };

  return (
    <Form
      data-cy="email-change"
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ maxWidth: MAX_FORM_WIDTH }}>
      <FormControlWrapper
        name="email"
        renderField={fieldProps => (
          <TextField disabled={mutateState.isPending} {...fieldProps} />
        )}
      />
      <FormActions>
        {actions}
        <ButtonSave isLoading={mutateState.isPending}>
          {t(`updateButton`)}
        </ButtonSave>
      </FormActions>
    </Form>
  );
}
