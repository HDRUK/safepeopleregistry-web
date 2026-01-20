"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import Guidance from "@/components/Guidance";
import Markdown from "@/components/Markdown";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import SelectCountry from "@/components/SelectCountry";
import Text from "@/components/Text";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import EmailChangeModal from "@/organisms/EmailChangeModal";
import { putUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { canUseIdvt } from "@/utils/application";
import { CheckCircle } from "@mui/icons-material";
import { Box, Button, Grid, Link, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import VeriffTermsAndConditions from "../VeriffTermsAndConditions";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  personal_email: string;
  location: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION = "Users.Identity";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Identity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));
  const { registry } = user as User;
  const { identity } = registry;
  const { idvt_started_at, idvt_success } = identity || {
    idvt_started_at: undefined,
    idvt_success: 0,
  };

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const updateUser = useMutation(putUserQuery(user?.id));

  const [showModal, setShowModal] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const handleDetailsSubmit = useCallback(
    async (fields: IdentityFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...fields,
          email: fields.personal_email,
        };

        await updateUser.mutateAsync(request);

        queryClient.refetchQueries({
          queryKey: ["getUser", user.id],
        });
      }
    },
    [user]
  );

  const handleVeriffSuccess = () => {
    if (user?.id) {
      queryClient.refetchQueries({
        queryKey: ["getUser", user.id],
      });
    }
  };

  useQueryAlerts(updateUser, {
    errorAlertProps: {
      text: <ErrorMessage t={t} tKey="postUserError" />,
      confirmButtonText: t("postUserErrorButton"),
    },
    successAlertProps: {
      text: t("postUserSuccess"),
      confirmButtonText: t("postUserSuccessButton"),
      onConfirm: async () => {
        router.push(ROUTES.profileResearcherExperience.path);
      },
    },
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        personal_email: yup
          .string()
          .email()
          .required(tForm("emailRequiredInvalid")),
        location: yup.string().required(tForm("locationRequiredInvalid")),
      }),
    []
  );

  const error = updateUser.isError && (
    <ErrorMessage t={t} tKey={updateUser.error} />
  );

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      personal_email: user?.email,
      location: user?.location,
    },
    error,
  };

  return (
    <PageBodyContainer heading={t("identityTitle")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <PageBody>
            <PageSection heading={t("identityForm")}>
              <Form
                onSubmit={handleDetailsSubmit}
                schema={schema}
                canLeave
                key={user?.id}
                {...formOptions}>
                <>
                  <FormSection>
                    <Grid container rowSpacing={3}>
                      <Grid item xs={12}>
                        <FormControlWrapper
                          name="first_name"
                          renderField={fieldProps => (
                            <TextField {...fieldProps} />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlWrapper
                          name="last_name"
                          renderField={fieldProps => (
                            <TextField {...fieldProps} />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlWrapper
                          name="personal_email"
                          renderField={fieldProps => (
                            <Box sx={{ display: "flex", gap: 2 }}>
                              <TextField
                                {...fieldProps}
                                sx={{ width: "500px" }}
                              />
                              <Link
                                component="button"
                                onClick={e => {
                                  e.preventDefault();
                                  setShowChangeEmail(true);
                                }}>
                                Change email
                              </Link>
                              <EmailChangeModal
                                open={showChangeEmail}
                                onClose={() => {
                                  setShowChangeEmail(false);
                                }}
                                onSuccess={() => {
                                  setShowChangeEmail(false);
                                }}
                                defaultEmail={fieldProps.value}
                                userId={user.id}
                              />
                            </Box>
                          )}
                          description={t.rich("emailDescription", {
                            bold: chunks => <strong>{chunks}</strong>,
                          })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlWrapper
                          name="location"
                          description={t("locationDescription")}
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
                    </Grid>
                  </FormSection>
                  {canUseIdvt(formOptions.defaultValues.location) && (
                    <FormSection heading={t("idvtCheckSection")}>
                      <Grid container spacing={3}>
                        <Grid container item spacing={3}>
                          <Grid item xs={8}>
                            {idvt_success ? (
                              <Text startIcon={<CheckCircle color="success" />}>
                                {t("idvtCheckComplete")}
                              </Text>
                            ) : (
                              <>
                                <Button
                                  sx={{ mb: 1 }}
                                  variant="outlined"
                                  onClick={() => setShowModal(true)}>
                                  {idvt_started_at
                                    ? t("idvtCheckButtonRestart")
                                    : t("idvtCheckButtonStart")}
                                </Button>
                                <Markdown variant="subtitle">
                                  {t("idvtCheckDescription")}
                                </Markdown>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </FormSection>
                  )}
                  <FormActions>
                    <ProfileNavigationFooter
                      nextStepText={tProfile("experience")}
                      isLoading={updateUser.isPending}
                    />
                  </FormActions>
                </>
              </Form>
              <VeriffTermsAndConditions
                open={showModal}
                onSuccess={handleVeriffSuccess}
                onClose={() => setShowModal(false)}
              />
            </PageSection>
          </PageBody>
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <Guidance
            {...mockedPersonalDetailsGuidanceProps}
            isCollapsible={false}
            infoWidth="100%"
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
