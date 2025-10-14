import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import FormSection from "../../components/FormSection";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import { PostCustodianPayload } from "../../services/custodians";
import { MutationState } from "../../types/form";

export interface InviteCustodianFormProps {
  onSubmit: (custodian: PostCustodianPayload) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_CUSTODIAN = "Custodian";

export default function InviteCustodianForm({
  onSubmit,
  queryState,
}: InviteCustodianFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tCustodian = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN);

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(tForm("nameRequiredInvalid")),
        contact_email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      custodian_name: "",
      lead_applicant_email: "",
    },
  };

  const formFields = ["name", "contact_email"];

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      shouldReset
      sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}>
      {() => (
        <>
          <FormSection subtitle={tCustodian("inviteCustodianTitle")}>
            <Grid container rowSpacing={3}>
              {formFields.map((name: string) => (
                <Grid item xs={12} key={name}>
                  <FormControlWrapper
                    labelPosition="left"
                    name={name}
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              ))}
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              type="submit"
              endIcon={<SaveIcon />}
              loading={queryState.isPending}
              sx={{ display: "flex", justifySelf: "end" }}>
              {tForm(`inviteButton`)}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
