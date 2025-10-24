"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import OrganisationsSubsidiaries from "@/organisms/OrganisationsSubsidiaries/OrganisationsSubsidiaries";
import SroDeclaration from "@/organisms/SroDeclaration";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { getUserQuery, putUserQuery } from "@/services/users";
import { AddressFields } from "@/types/application";
import { KeyContactFormValues } from "@/types/form";
import { pick } from "@/utils/json";
import { Grid, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";
import SroFields from "../SroFields";

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
  "sro_profile_uri",
];

const SRO_KEYS = ["first_name", "last_name", "email", "role", "department"];

export default function NameAndAddress() {
  const { organisation, refetch } = useOrganisationStore();
  const router = useRouter();

  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit: onSubmitOrganisation,
  } = useUpdateOrganisation({
    id: organisation?.id,
  });

  const { mutateAsync: mutateUser } = useMutation(
    putUserQuery(user?.id as number)
  );

  const { data: userData, refetch: refetchUserData } = useQuery({
    ...getUserQuery(user?.id as number),
    enabled: false,
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
        first_name: yup.string().required(),
        last_name: yup.string().required(),
        department: yup.number().required(),
        email: yup
          .string()
          .email(tForm("emailInvalid"))
          .required(tForm("emailRequired")),
        role: yup.string().required(tForm("roleRequiredInvalid")),
        sro_profile_uri: yup
          .string()
          .url(tForm("sroProfileUriInvalid"))
          .required(tForm("sroProfileUriRequiredInvalid")),
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
      first_name: user?.first_name,
      last_name: user?.last_name,
      department: user?.departments?.[0]?.id,
      email: user?.email,
      role: user?.role,
      sro_profile_uri: organisation?.sro_profile_uri,
    },
    error: isError && <ErrorMessage t={tProfile} tKey={error} />,
  };

  const handleSubmit = async (
    formData: Partial<NameAndAddressFormValues & KeyContactFormValues>
  ) => {
    const organisationPayload = pick(
      formData,
      ORG_KEYS
    ) as Partial<NameAndAddressFormValues>;

    const { department, ...restSroPayload } = pick(
      formData,
      SRO_KEYS
    ) as Partial<KeyContactFormValues>;

    await onSubmitOrganisation(organisationPayload);

    await mutateUser({
      ...restSroPayload,
      department_id: department,
      is_sro: true,
    });

    refetchUserData();

    router.push(ROUTES.profileOrganisationDetailsDigitalIdentifiers.path);
  };

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData, setUser]);

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
                    <FormControlWrapper
                      name="organisation_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
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
                    <FormControlWrapper
                      name="address_1"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="address_2"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="town"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="county"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="country"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlWrapper
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

              <SroFields />
              <SroDeclaration />

              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="sro_profile_uri"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                    description={tForm("sroProfileUriDescription")}
                  />
                </Grid>
              </Grid>

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
