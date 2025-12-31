"use client";

import Form, { FormProps } from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import SelectDepartments from "@/components/SelectDepartments";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { WithMutationState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface DelegatesFormValues {
  first_name: string;
  last_name: string;
  department_id: number;
}

export interface EditDelegateFormProps extends WithMutationState<
  FormProps<DelegatesFormValues>
> {
  onClose?: () => void;
}

const NAMESPACE_TRANSLATION_DELEGATES = "Form";
export default function EditDelegateForm({
  mutateState,
  onClose,
  ...restProps
}: EditDelegateFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_DELEGATES);
  const organisation = useStore(state => state.config.organisation);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup
          .string()
          .required(t("delegateFirstNameRequiredInvalid")),
        last_name: yup.string().required(t("delegateLastNameRequiredInvalid")),
        department_id: yup.number(),
      }),
    [t]
  );

  return (
    <Form
      sx={{ mt: 1 }}
      schema={schema}
      aria-label="Edit delegate"
      {...restProps}>
      <>
        <FormSection>
          <Grid
            container
            rowSpacing={3}
            sx={{ width: "70%", justifyContent: "flex-start" }}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlWrapper
                name="department_id"
                renderField={fieldProps => (
                  <SelectDepartments
                    organisation={organisation}
                    {...fieldProps}
                    inputProps={{
                      "aria-label": t("departmentNameAriaLabel"),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormSection>
        <FormActions>
          <Button variant="outlined" onClick={onClose}>
            {t("cancelButton")}
          </Button>
          <LoadingButton loading={mutateState.isPending} type="submit">
            {t("save")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
