"use client";

import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import { PageBody, PageSection } from "@/modules";
import { AddressFields } from "@/types/application";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/consts/router";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import ErrorMessage from "@/components/ErrorMessage";
import OrganisationsSubsidiaries from "@/organisms/OrganisationsSubsidiaries/OrganisationsSubsidiaries";
import useOrganisationStore from "@/queries/useOrganisationStore";
import SroDeclaration from "@/organisms/SroDeclaration/SroDeclaration";
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

export default function NameAndAddress() {
  const { organisation, refetch } = useOrganisationStore();
  const router = useRouter();

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
    []
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

  const handleSubmit = (fields: Partial<NameAndAddressFormValues>) => {
    onSubmit(fields).then(() =>
      router.push(ROUTES.profileOrganisationDetailsDigitalIdentifiers.path)
    );
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <PageBody>
      <Form
        aria-label="Name and address"
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
                heading={tOrgProfile("nameAndAddressTitle")}
                description={tOrgProfile.rich("nameAndAddressDescription", {
                  bold: chunks => <b>{chunks}</b>,
                  br: () => <br />,
                })}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="organisation_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="address"
                      displayPlaceholder={false}
                      description={tOrgProfile(
                        "nameAndAddressAddressDescription"
                      )}
                      renderField={() => (
                        <GoogleAutocomplete
                          name="address"
                          textFieldProps={{
                            size: "small",
                          }}
                          onAddressSelected={value =>
                            handleFindAddress(value as AddressFields)
                          }
                          placeholder="Search for your address..."
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="address_1"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="address_2"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="town"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="county"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="country"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="postcode"
                      renderField={fieldProps => (
                        <TextField {...fieldProps} sx={{ maxWidth: "200px" }} />
                      )}
                    />
                  </Grid>
                </Grid>
              </PageSection>

              <OrganisationsSubsidiaries
                onEditSuccess={() => handleRefetch()}
                onDeleteSuccess={() => handleRefetch()}
              />

              <SroDeclaration />

              <FormActions>
                <ProfileNavigationFooter
                  nextStepText={tOrgProfile("detailsDigitalIdentifiers")}
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
