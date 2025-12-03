import FormControlWrapper from "@/components/FormControlWrapper";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormSection from "../../components/FormSection";
import LoadingWrapper from "../../components/LoadingWrapper";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import {
  getOrganisationQuery,
  PostOrganisationUnclaimedPayload,
} from "../../services/organisations";
import { MutationState } from "../../types/form";

export interface InviteOrganisationFormProps {
  organisationId?: number;
  onSubmit: (organisation: PostOrganisationUnclaimedPayload) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "Organisation";

export default function InviteOrganisationForm({
  organisationId,
  onSubmit,
  queryState,
}: InviteOrganisationFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrganisation = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION);

  const { data: organisation, isLoading } = useQuery(
    getOrganisationQuery(organisationId as number, {
      enabled: !!organisationId,
    })
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        organisation_name: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        lead_applicant_email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = useMemo(
    () => ({
      defaultValues: {
        organisation_name: organisation?.data.organisation_name || "",
        lead_applicant_email: organisation?.data.lead_applicant_email || "",
      },
    }),
    [organisation?.data]
  );

  const formFields = ["organisation_name", "lead_applicant_email"];

  return (
    <LoadingWrapper loading={isLoading} variant="basic">
      <Form
        onSubmit={onSubmit}
        schema={schema}
        {...formOptions}
        sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}
        shouldReset>
        {() => (
          <>
            <FormSection subtitle={tOrganisation("inviteOrganisationTitle")}>
              <Grid container rowSpacing={3}>
                {formFields.map((name: string) => (
                  <Grid item xs={12} key={name}>
                    <FormControlWrapper
                      name={name}
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={tOrganisation(
                        "inviteOrganisationEmailDescription"
                      )}
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
                {organisationId
                  ? tForm(`resendInviteButton`)
                  : tForm(`inviteButton`)}
              </LoadingButton>
            </FormActions>
          </>
        )}
      </Form>
    </LoadingWrapper>
  );
}
