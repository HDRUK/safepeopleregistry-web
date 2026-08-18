"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import SroDeclaration from "@/organisms/SroDeclaration";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { getUserQuery, putUserQuery } from "@/services/users";
import { KeyContactFormValues } from "@/types/form";
import { pick } from "@/utils/json";
import { Grid, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";
import SroFields from "../SroFields";

export interface NameAndSROFormValues {
  organisation_name: string;
  sro_profile_uri: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

const ORG_KEYS = ["organisation_name", "sro_profile_uri"];

const SRO_KEYS = ["first_name", "last_name", "email", "role", "department"];

export default function NameAndSRO() {
  const { organisation } = useOrganisationStore();
  const router = useRouter();

  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));

  const isDelegate = user?.is_delegate === 1;

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
        first_name: !isDelegate
          ? yup.string().required()
          : yup.string().nullable(),
        last_name: !isDelegate
          ? yup.string().required()
          : yup.string().nullable(),
        department: !isDelegate
          ? yup.number().required()
          : yup.number().nullable(),
        email: !isDelegate
          ? yup
              .string()
              .email(tForm("emailInvalid"))
              .required(tForm("emailRequired"))
          : yup.string().nullable(),
        role: !isDelegate
          ? yup.string().required(tForm("roleRequiredInvalid"))
          : yup.string().nullable(),
        sro_profile_uri: !isDelegate
          ? yup
              .string()
              .url(tForm("sroProfileUriInvalid"))
              .required(tForm("sroProfileUriRequiredInvalid"))
          : yup.string().nullable(),
      }),
    [tForm]
  );
  const formOptions = {
    defaultValues: {
      organisation_name: organisation?.organisation_name,
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
    formData: Partial<NameAndSROFormValues & KeyContactFormValues>
  ) => {
    const organisationPayload = pick(
      formData,
      ORG_KEYS
    ) as Partial<NameAndSROFormValues>;

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

    router.push(ROUTES.profileOrganisationDetailsAddress.path);
  };

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData, setUser]);

  return (
    <PageBody>
      <Form
        aria-label={tOrgProfile("nameAndSROTitle")}
        schema={schema}
        onSubmit={handleSubmit}
        {...formOptions}
        key={organisation?.id}>
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
        <SroFields />
        <SroDeclaration />

        <Grid container rowSpacing={3}>
          <Grid size={{ xs: 12 }}>
            <FormControlWrapper
              name="sro_profile_uri"
              renderField={fieldProps =>
                !isDelegate ? (
                  <TextField {...fieldProps} />
                ) : (
                  <Typography gutterBottom>{fieldProps.value}</Typography>
                )
              }
              description={tForm("sroProfileUriDescription")}
            />
          </Grid>
        </Grid>

        <FormActions>
          <ProfileNavigationFooter
            nextStepText={tOrgProfile("nextStepAddress")}
            isLoading={isLoading}
          />
        </FormActions>
      </Form>
    </PageBody>
  );
}
