"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { AddressFields } from "@/types/application";
import { pick } from "@/utils/json";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";

export interface NameAndAddressFormValues {
  organisation_name: string;
  address_1: string;
  address_2?: string | null;
  town: string;
  county: string;
  country: string;
  postcode: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

const ORG_KEYS = [
  "organisation_name",
  "address_1",
  "address_2",
  "town",
  "county",
  "country",
  "postcode",
];

export default function NameAndAddress() {
  const { organisation } = useOrganisationStore();
  const router = useRouter();

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit: onSubmitOrganisation,
  } = useUpdateOrganisation({
    id: organisation?.id,
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        organisation_name: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        address_1: yup.string().required(tForm("address1RequiredInvalid")),
        address_2: yup.string().nullable(),
        town: yup.string().required(tForm("townRequiredInvalid")),
        county: yup.string().required(tForm("countyRequiredInvalid")),
        country: yup.string().required(tForm("countryRequiredInvalid")),
        postcode: yup.string().required(tForm("postcodeRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      organisation_name: organisation?.organisation_name,
      address_1: organisation?.address_1,
      address_2: organisation?.address_2,
      town: organisation?.town,
      county: organisation?.county,
      country: organisation?.country,
      postcode: organisation?.postcode,
    },
    error: isError && <ErrorMessage t={tProfile} tKey={error} />,
  };

  const handleSubmit = async (formData: Partial<NameAndAddressFormValues>) => {
    const organisationPayload = pick(
      formData,
      ORG_KEYS
    ) as Partial<NameAndAddressFormValues>;

    await onSubmitOrganisation(organisationPayload);

    router.push(ROUTES.profileOrganisationDetailsOrganisationDetails.path);
  };

  return (
    <PageBody>
      <Form
        aria-label={tOrgProfile("nameAndAddressTitle")}
        schema={schema}
        onSubmit={handleSubmit}
        {...formOptions}
        key={organisation?.id}>
        {({ setValue }) => {
          const handleFindAddress = (address: AddressFields) => {
            Object.entries(address).forEach(([key, value]) => {
              setValue(key as keyof NameAndAddressFormValues, value ?? "");
            });
          };

          return (
            <>
              <PageSection
                heading={tOrgProfile("organisationName")}
                description={tOrgProfile.rich("nameAndSRODescription", {
                  bold: chunks => <strong>{chunks}</strong>,
                })}>
                <Grid container rowSpacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="organisation_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                </Grid>
              </PageSection>
              <PageSection
                heading={tOrgProfile("addressTitle")}
                description={tOrgProfile("addressDescription")}>
                <Grid container rowSpacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="address"
                      displayPlaceholder={false}
                      renderField={() => (
                        <GoogleAutocomplete
                          name="address"
                          textFieldProps={{
                            size: "small",
                          }}
                          onAddressSelected={value =>
                            handleFindAddress(value as AddressFields)
                          }
                          placeholder={tOrgProfile("addressSearch")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="address_1"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="address_2"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="town"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="county"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="country"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="postcode"
                      renderField={fieldProps => (
                        <TextField {...fieldProps} sx={{ maxWidth: "200px" }} />
                      )}
                    />
                  </Grid>
                </Grid>
              </PageSection>
              <FormActions>
                <ProfileNavigationFooter
                  nextStepText={tOrgProfile("nextStepOrganisationDetails")}
                  isLoading={isLoading}
                />
              </FormActions>
            </>
          );
        }}
      </Form>
    </PageBody>
  );
}
