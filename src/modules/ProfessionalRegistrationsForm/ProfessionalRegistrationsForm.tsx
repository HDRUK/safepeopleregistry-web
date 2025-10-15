"use client";

import { Button, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import ButtonSave from "../../components/ButtonSave";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";

import FormControlWrapper from "../../components/FormControlWrapper";
import FormSection from "../../components/FormSection";
import yup from "../../config/yup";
import { ResearcherProfessionalRegistration } from "../../types/application";
import { MutationState } from "../../types/form";

export interface ProfessionalRegistrationsFormProps {
  onSubmit: (
    professionalRegistration: ResearcherProfessionalRegistration
  ) => void;
  queryState: MutationState;
  onClose: () => void;
  data?: ResearcherProfessionalRegistration;
  isEdit: boolean;
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
export default function ProfessionalRegistrationsForm({
  onSubmit,
  onClose,
  queryState,
  data,
  isEdit,
}: ProfessionalRegistrationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tProfile("memberIdRequiredInvalid")),
        name: yup.string().required(tProfile("nameRequiredInvalid")),
      }),
    [tProfile]
  );

  const formOptions = {
    defaultValues: {
      member_id: data?.member_id || "",
      name: data?.name || "",
      ...data,
    },
  };
  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3 }}
      shouldReset={!isEdit}>
      <FormSection>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <FormControlWrapper
              name="name"
              tNamespace={NAMESPACE_TRANSLATION_PROFILE}
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlWrapper
              name="member_id"
              tNamespace={NAMESPACE_TRANSLATION_PROFILE}
              renderField={fieldProps => <TextField {...fieldProps} />}
            />
          </Grid>
        </Grid>
      </FormSection>
      <FormActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          {tProfile("cancel")}
        </Button>
        <ButtonSave isLoading={queryState.isPending} />
      </FormActions>
    </Form>
  );
}
