"use client";

import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { PutOrganisationPayload } from "@/services/organisations";
import { formatDBDate } from "@/utils/date";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";
import CertificationUploader from "./CertificationUploader";
import {
  certificationRows,
  getDefaultValues,
  getValidation,
  SecurityCompilanceFormData,
} from "./config/form";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function SecurityCompliance() {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    isPending: isLoading,
    onSubmit,
    ...mutationState
  } = useUpdateOrganisation({
    id: organisation?.id,
  });

  useQueryAlerts({
    ...mutationState,
    isLoading,
  });

  const schema = getValidation(t);
  const defaultValues = useMemo(
    () => getDefaultValues(organisation),
    [organisation]
  );

  const handleSubmit = (data: SecurityCompilanceFormData) => {
    const payload = {
      ...data,
      ce_expiry_date: formatDBDate(data.ce_expiry_date),
      ce_plus_expiry_date: formatDBDate(data.ce_plus_expiry_date),
      iso_expiry_date: formatDBDate(data.iso_expiry_date),
      dsptk_expiry_date: formatDBDate(data.dsptk_expiry_date),
    } as PutOrganisationPayload;

    onSubmit(payload);
  };

  return (
    <PageBody>
      <PageSection
        heading={tProfile("dataSecurityCompliance")}
        description={tProfile("dataSecurityComplianceText")}>
        <Form
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}>
          <>
            {certificationRows.map(cert => (
              <FormSection key={cert.name} heading={t(cert.name)}>
                <Grid container rowSpacing={3}>
                  <Grid container item spacing={3}>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name={cert.certificationNum}
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item spacing={3}>
                    <Grid item xs={3}>
                      <FormControlWrapper
                        name={cert.certificationExpiryDate}
                        renderField={fieldProps => (
                          <DateInput {...fieldProps} disabled={false} />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <FormControlWrapper
                    name={cert.certificationEvidence}
                    displayLabel={false}
                    renderField={fieldProps => (
                      <CertificationUploader
                        name={cert.name}
                        value={fieldProps.value}
                        onChange={fieldProps.onChange}
                      />
                    )}
                  />
                </Grid>
              </FormSection>
            ))}

            <FormActions>
              <ProfileNavigationFooter
                previousHref={
                  ROUTES.profileOrganisationDetailsSectorSizeAndWebsite.path
                }
                isLoading={isLoading}
              />
            </FormActions>
          </>
        </Form>
      </PageSection>
    </PageBody>
  );
}
