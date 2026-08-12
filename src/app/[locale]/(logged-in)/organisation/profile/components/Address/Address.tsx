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
import useOrganisationStore from "@/queries/useOrganisationStore";
import { getUserQuery } from "@/services/users";
import { AddressFields } from "@/types/application";
import { KeyContactFormValues } from "@/types/form";
import { pick } from "@/utils/json";
import { Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";

export interface AddressFormValues {
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
  "address_1",
  "address_2",
  "town",
  "county",
  "country",
  "postcode",
];

export default function Address() {
  const { organisation } = useOrganisationStore();
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
      address_1: organisation?.address_1,
      address_2: organisation?.address_2,
      town: organisation?.town,
      county: organisation?.county,
      country: organisation?.country,
      postcode: organisation?.postcode,
    },
    error: isError && <ErrorMessage t={tProfile} tKey={error} />,
  };

  const handleSubmit = async (
    formData: Partial<AddressFormValues & KeyContactFormValues>
  ) => {
    const organisationPayload = pick(
      formData,
      ORG_KEYS
    ) as Partial<AddressFormValues>;

    await onSubmitOrganisation(organisationPayload);

    refetchUserData();

    router.push(ROUTES.profileOrganisationDetailsOrganisationDetails.path);
  };

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData, setUser]);

  return (
    <PageBody>
      <Form
        aria-label={tOrgProfile("addressTitle")}
        schema={schema}
        onSubmit={handleSubmit}
        {...formOptions}
        key={organisation?.id}>
        {({ setValue }) => {
          const handleFindAddress = (address: AddressFields) => {
            Object.entries(address).forEach(([key, value]) => {
              setValue(key as keyof AddressFormValues, value ?? "");
            });
          };

          return (
            <>
              <PageSection heading={tOrgProfile("addressTitle")}>
                <Grid container rowSpacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="address"
                      displayPlaceholder={false}
                      description={tOrgProfile("addressDescription")}
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
                  previousHref={
                    ROUTES.profileOrganisationDetailsNameAndSRO.path
                  }
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
