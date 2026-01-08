import ButtonSave from "@/components/ButtonSave";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form, { FormProps } from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import yup from "../../config/yup";
import { MutationState } from "../../types/form";
import ButtonCancel from "@/components/ButtonCancel";

export interface EmailResetFormProps extends Omit<FormProps<{}>, "children"> {
  mutateState?: MutationState;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_FORM = "Form.EmailReset";

export default function EmailResetForm({
  onClose,
  mutateState,
  ...restProps
}: EmailResetFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email(),
      }),
    []
  );

  const formOptions = {
    disabled: mutateState?.isPending || restProps.disabled,
  };

  return (
    <Form
      aria-label="Change registered email"
      schema={schema}
      {...formOptions}
      {...restProps}
      autoComplete="off">
      <FormControlWrapper
        name="email"
        t={t}
        renderField={fieldProps => <TextField {...fieldProps} />}
      />
      <FormActions>
        <ButtonCancel onClick={onClose} />
        <ButtonSave isLoading={mutateState?.isPending}>
          {t("updateButton")}
        </ButtonSave>
      </FormActions>
    </Form>
  );
}
