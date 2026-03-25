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
import DirectoryLink from "./DirectoryLink";

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
      dsptk_date_last_published: formatDBDate(data.dsptk_date_last_published),
      ico_date_registered: formatDBDate(data.dsptk_expiry_date),
      ico_expiry_date: formatDBDate(data.dsptk_expiry_date),
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
              <FormSection heading={t(cert.name)}>
                <Grid container spacing={3} direction="column">
                  <Grid item xs={6}>
                    <FormControlWrapper
                      name={cert.certificationNum}
                      renderField={fieldProps => (
                        <TextField {...fieldProps} sx={{ maxWidth: "450px" }} />
                      )}
                    />
                    {cert.certificationDirectoryURL && (
                      <DirectoryLink
                        baseUrl={cert.certificationDirectoryURL}
                        fieldName={cert.certificationNum}
                      />
                    )}
                  </Grid>

                  {cert.certificationStatus && (
                    <Grid item xs={3}>
                      <FormControlWrapper
                        name={cert.certificationStatus}
                        renderField={fieldProps => (
                          <TextField
                            {...fieldProps}
                            sx={{ maxWidth: "450px" }}
                          />
                        )}
                      />
                    </Grid>
                  )}

                  {cert.certificationRegisteredDate && (
                    <Grid item xs={3}>
                      <FormControlWrapper
                        name={cert.certificationRegisteredDate}
                        renderField={fieldProps => (
                          <DateInput
                            {...fieldProps}
                            disabled={false}
                            sx={{ maxWidth: "200px" }}
                          />
                        )}
                      />
                    </Grid>
                  )}

                  <Grid item xs={3}>
                    <FormControlWrapper
                      name={cert.certificationExpiryDate}
                      renderField={fieldProps => (
                        <DateInput
                          {...fieldProps}
                          disabled={false}
                          sx={{ maxWidth: "200px" }}
                        />
                      )}
                    />
                  </Grid>

                  {cert.certificationEvidence && (
                    <Grid item xs={3}>
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
                  )}
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
