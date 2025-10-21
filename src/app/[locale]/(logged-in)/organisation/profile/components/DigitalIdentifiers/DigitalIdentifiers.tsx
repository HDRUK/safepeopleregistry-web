"use client";

import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormFieldArray from "@/components/FormFieldArray";
import SelectCountry from "@/components/SelectCountry";
import yup from "@/config/yup";
import { VALIDATION_CHARITY_ID, VALIDATION_ROR_ID } from "@/consts/form";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import { Box, Grid, Link, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { ROUTES } from "@/consts/router";
import { useRouter } from "next/navigation";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { Charity } from "@/types/application";
import FormControlWrapper from "@/components/FormControlWrapper";

import ErrorMessage from "@/components/ErrorMessage";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";

export interface DigitalIdentifiersFormValues {
  companies_house_no: string;
  charities: Charity[];
  ror_id: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function DigitalIdentifiers() {
  const router = useRouter();
  const organisation = useStore(state => state.config.organisation);

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
        companies_house_no: yup.string(),
        isCharity: yup.boolean(),
        charities: yup.array().when("isCharity", {
          is: true,
          then: schema =>
            schema
              .of(
                yup.object().shape({
                  registration_id: yup
                    .string()
                    .required(tForm("charityRegistrationIdRequiredInvalid"))
                    .matches(
                      VALIDATION_CHARITY_ID,
                      tForm("charityRegistrationIdFormatInvalid")
                    ),
                  country: yup
                    .string()
                    .required(tForm("charityCountryRequired")),
                })
              )
              .min(1, tForm("atLeastOneCharityRequired")),
          otherwise: schema => schema.notRequired(),
        }),
        ror_id: yup
          .string()
          .matches(VALIDATION_ROR_ID, tForm("rorIdFormatInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      companies_house_no: organisation?.companies_house_no,
      charities: organisation?.charities.map(
        ({ country, registration_id }) => ({ country, registration_id })
      ),
      isCharity: organisation?.charities && organisation.charities.length > 0,
      ror_id: organisation?.ror_id,
    },
    error: isError && <ErrorMessage t={tProfile} tKey={error} />,
  };

  const handleSubmit = (fields: Partial<DigitalIdentifiersFormValues>) => {
    const payload = {
      charities: fields.charities,
      companies_house_no: fields.companies_house_no,
      ror_id: fields.ror_id,
    };
    onSubmit(payload).then(() =>
      router.push(ROUTES.profileOrganisationDetailsSectorSizeAndWebsite.path)
    );
  };
  return (
    <PageBody>
      <PageSection heading={tOrgProfile("detailsDigitalIdentifiersTitle")}>
        <Form
          aria-label="Digital identifiers"
          schema={schema}
          onSubmit={handleSubmit}
          {...formOptions}
          key={organisation?.id}>
          {({ watch, setValue }) => {
            const isCharity = watch("isCharity");

            if (!isCharity) {
              setValue("charities", [], { shouldValidate: true });
            }

            return (
              <>
                <Grid container rowSpacing={3}>
                  <Grid item xs={7}>
                    <FormControlWrapper
                      name="companies_house_no"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={tOrgProfile.rich(
                        "companiesHouseIdDescription",
                        {
                          link: chunks => (
                            <Link
                              href="https://find-and-update.company-information.service.gov.uk/"
                              target="_blank">
                              {chunks}
                            </Link>
                          ),
                        }
                      )}
                    />
                  </Grid>

                  <Grid item xs={7}>
                    <FormControlWrapper
                      name="ror_id"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                      description={tForm.rich("rorIdDescription", {
                        link: chunks => (
                          <Link href="https://ror.org/search" target="_blank">
                            {chunks}
                          </Link>
                        ),
                      })}
                    />
                  </Grid>

                  <Grid item xs={7}>
                    <FormControlCheckbox
                      label={tForm("isCharity")}
                      name="isCharity"
                      labelCaption={tOrgProfile("isCharityDescription")}
                    />
                  </Grid>

                  {watch("isCharity") && (
                    <Grid item xs={12}>
                      <FormFieldArray<FormData>
                        name="charities"
                        initialRowCount={1}
                        minimumRows={1}
                        displayLabel={false}
                        createNewRow={() => ({
                          country: "United Kingdom",
                          registration_id: "",
                        })}
                        addButtonLabel={tForm("addAnotherCharity")}
                        renderField={(field, index, removeButton) => (
                          <Grid container columnSpacing={3} key={field.id}>
                            <Grid item xs={5}>
                              <FormControlWrapper
                                fullWidth
                                sx={{
                                  width: "100%",
                                }}
                                label={tForm("country")}
                                name={`charities.${index}.country`}
                                placeholder="Country"
                                renderField={({ value, onChange, ...rest }) => (
                                  <SelectCountry
                                    useCountryCode={false}
                                    value={value}
                                    onChange={onChange}
                                    {...rest}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={5.5}>
                              <FormControlWrapper
                                displayLabel
                                fullWidth
                                label={tForm("charityRegistrationId")}
                                name={`charities.${index}.registration_id`}
                                placeholder={tForm("textFieldPlaceholder")}
                                renderField={fieldProps => (
                                  <Box sx={{ display: "flex" }}>
                                    <TextField {...fieldProps} />
                                    {removeButton}
                                  </Box>
                                )}
                              />
                            </Grid>
                          </Grid>
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
                <FormActions>
                  <ProfileNavigationFooter
                    previousHref={
                      ROUTES.profileOrganisationDetailsNameAndAddress.path
                    }
                    nextStepText={tOrgProfile("detailsSectorSizeAndWebsite")}
                    isLoading={isLoading}
                  />
                </FormActions>
              </>
            );
          }}
        </Form>
      </PageSection>
    </PageBody>
  );
}
