"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import {
  VALIDATION_URL,
  ORGANISATION_SIZE_OPTIONS as sizeOptions,
} from "@/consts/form";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";

export interface SectorFormValues {
  sector_id: number;
  website: string;
  organisation_size?: number;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function SectorSizeAndWebsite() {
  const router = useRouter();
  const { organisation, sectors } = useStore(state => {
    return {
      organisation: state.config.organisation,
      sectors: state.config.sectors,
    };
  });
  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = useUpdateOrganisation({
    id: organisation?.id,
  });
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        sector_id: yup.number().required(tForm("sectorIdRequiredInvalid")),
        website: yup
          .string()
          .required(tForm("websiteRequiredInvalid"))
          .matches(VALIDATION_URL, tForm("websiteFormatInvalid")),
        organisation_size: yup.number(),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      sector_id: organisation?.sector_id,
      website: organisation?.website,
      organisation_size: organisation?.organisation_size,
    },
    error: isError && <ErrorMessage t={tProfile} tKey={error} />,
  };

  const handleSubmit = (fields: Partial<SectorFormValues>) => {
    const payload = {
      website: fields.website,
      sector_id: Number(fields.sector_id),
      organisation_size: Number(fields.organisation_size),
    };

    onSubmit(payload).then(() => {
      router.push(ROUTES.profileOrganisationDetailsSecurityCompliance.path);
    });
  };

  return (
    <PageBody>
      <PageSection heading={tOrgProfile("detailsSectorSizeAndWebsite")}>
        <Form
          aria-label="Sector size and website"
          schema={schema}
          onSubmit={handleSubmit}
          {...formOptions}
          key={organisation?.id}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlWrapper
                name="sector_id"
                description={tOrgProfile(
                  "detailsOrganisationSectorDescription"
                )}
                renderField={fieldProps => (
                  <Select
                    {...fieldProps}
                    inputProps={{
                      "aria-label": tForm("sectorIdAriaLabel"),
                    }}>
                    {sectors?.map(({ name, id }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="organisation_size"
                displayPlaceholder={false}
                renderField={fieldProps => (
                  <Select
                    {...fieldProps}
                    inputProps={{
                      "aria-label": tForm("smbStatusDescription"),
                    }}>
                    {sizeOptions?.map(({ label, value }) => (
                      <MenuItem value={value} key={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlWrapper
                name="website"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
          <FormActions>
            <ProfileNavigationFooter
              previousHref={
                ROUTES.profileOrganisationDetailsDigitalIdentifiers.path
              }
              nextStepText={tOrgProfile("detailsSubsidiaries")}
              isLoading={isLoading}
            />
          </FormActions>
        </Form>
      </PageSection>
    </PageBody>
  );
}
