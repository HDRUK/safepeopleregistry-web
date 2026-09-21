"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { PageBody } from "@/modules";
import SroDeclaration from "@/organisms/SroDeclaration";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { getUserQuery, putUserQuery } from "@/services/users";
import { KeyContactFormValues } from "@/types/form";
import { formatDisplayLongDateTime } from "@/utils/date";
import { getLatestSRODeclaration, isFileScanComplete } from "@/utils/file";
import { pick } from "@/utils/json";
import { Chip, Grid, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import useUpdateOrganisation from "../../hooks/useUpdateOrganisation";
import SroFields from "../SroFields";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

const SRO_KEYS = ["first_name", "last_name", "email", "role", "department"];

interface SroFormProps {
  isDelegate: boolean;
  hasSroAssigned: boolean;
}

export default function SroForm({ isDelegate, hasSroAssigned }: SroFormProps) {
  const { organisation } = useOrganisationStore();

  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));

  const latestSroDeclaration = getLatestSRODeclaration(organisation?.files);
  const hasCompletedSroDeclaration = isFileScanComplete(latestSroDeclaration);

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit: onSubmitOrganisation,
  } = useUpdateOrganisation({ id: organisation?.id });

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
        first_name: !(isDelegate && hasSroAssigned)
          ? yup.string().required()
          : yup.string().nullable(),
        last_name: !(isDelegate && hasSroAssigned)
          ? yup.string().required()
          : yup.string().nullable(),
        department: !(isDelegate && hasSroAssigned)
          ? yup.number().required()
          : yup.number().nullable(),
        email: !(isDelegate && hasSroAssigned)
          ? yup
              .string()
              .email(tForm("emailInvalid"))
              .required(tForm("emailRequired"))
          : yup.string().nullable(),
        role: !(isDelegate && hasSroAssigned)
          ? yup.string().required(tForm("roleRequiredInvalid"))
          : yup.string().nullable(),
        sro_profile_uri: !(isDelegate && hasSroAssigned)
          ? yup
              .string()
              .url(tForm("sroProfileUriInvalid"))
              .required(tForm("sroProfileUriRequiredInvalid"))
          : yup.string().nullable(),
      }),
    [tForm, isDelegate, hasSroAssigned]
  );

  const formOptions = {
    defaultValues: {
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
    formData: Partial<KeyContactFormValues & { sro_profile_uri: string }>
  ) => {
    const { department, ...restSroPayload } = pick(
      formData,
      SRO_KEYS
    ) as Partial<KeyContactFormValues>;

    await onSubmitOrganisation({
      sro_profile_uri: formData.sro_profile_uri,
    });

    await mutateUser({
      ...restSroPayload,
      department_id: department,
      is_sro: true,
    });

    refetchUserData();
  };

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData, setUser]);

  return (
    <PageBody>
      <Form
        aria-label={tOrgProfile("sroInviteTitle")}
        schema={schema}
        onSubmit={handleSubmit}
        {...formOptions}
        key={organisation?.id}>
        <SroFields isDelegate={isDelegate} hasSroAssigned={hasSroAssigned} />
        <SroDeclaration isDelegate={isDelegate} />

        <Grid container rowSpacing={3}>
          <Grid size={{ xs: 12 }}>
            <FormControlWrapper
              name="sro_profile_uri"
              renderField={fieldProps =>
                !(isDelegate && hasSroAssigned) ? (
                  <TextField {...fieldProps} />
                ) : (
                  <Typography gutterBottom>{fieldProps.value}</Typography>
                )
              }
              description={tForm("sroProfileUriDescription")}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={{ xs: 12 }}>
            {hasCompletedSroDeclaration ? (
              <Chip
                color="success"
                label={tOrgProfile("sroDeclarationApprovedChip", {
                  date: String(
                    formatDisplayLongDateTime(
                      latestSroDeclaration?.updated_at ??
                        latestSroDeclaration?.created_at
                    )
                  ),
                })}
              />
            ) : (
              <Chip
                color="warning"
                label={tOrgProfile("sroDeclarationPendingApprovalChip")}
              />
            )}
          </Grid>
        </Grid>

        <FormActions>
          <ProfileNavigationFooter
            previousHref={
              ROUTES.profileOrganisationDetailsSecurityCompliance.path
            }
            isLoading={isLoading}
          />
        </FormActions>
      </Form>
    </PageBody>
  );
}
