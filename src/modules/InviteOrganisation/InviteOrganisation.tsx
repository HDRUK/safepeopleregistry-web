import FormControlWrapper from "@/components/FormControlWrapper";
import { WithTranslations } from "@/types/application";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import { useMemo } from "react";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormSection from "../../components/FormSection";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import { InviteOrganisationFormValues, MutationState } from "../../types/form";

export type InviteOrganisationFormProps = WithTranslations<{
  onSubmit: (organisation: InviteOrganisationFormValues) => void;
  onCancel: () => void;
  queryState: MutationState;
}>;

export default function InviteOrganisationForm({
  onSubmit,
  onCancel,
  queryState,
  t,
}: InviteOrganisationFormProps) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        organisation_name: yup
          .string()
          .required(t("organisationNameRequiredInvalid")),
        lead_applicant_email: yup
          .string()
          .email(t("emailFormatInvalid"))
          .required(t("emailRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      organisation_name: "",
      lead_applicant_email: "",
    },
  };

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}
      shouldReset>
      {() => (
        <>
          <FormSection>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="organisation_name"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="lead_applicant_email"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                  description={t("emailDescription")}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormActions>
            <Button variant="outlined" onClick={onCancel}>
              {t("cancelButton")}
            </Button>
            <LoadingButton loading={queryState.isPending} type="submit">
              {t("inviteButton")}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
