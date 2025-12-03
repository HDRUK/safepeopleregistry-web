import {
  postCustodianInviteUserQuery,
  postOrganisationInviteUserQuery,
} from "@/services/organisations";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Link, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Form from "../../components/Form";
import FormActions from "../../components/FormActions";
import FormControlWrapper from "../../components/FormControlWrapper";
import FormSection from "../../components/FormSection";
import SelectOrganisation from "../../components/SelectOrganisation";
import SelectRole from "../../components/SelectRole";
import yup from "../../config/yup";
import { MAX_FORM_WIDTH } from "../../consts/form";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import useOrganisationInvite from "../../queries/useOrganisationInvite";
import { getUsers } from "../../services/users";
import { Role } from "../../types/application";
import { InviteUserFormValues } from "../../types/form";
import { getCombinedQueryState } from "../../utils/query";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORGANISATION = "Users.InviteUser";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export interface InviteUserFormProps {
  onSuccess?: (id: number, roleId: number) => void;
  organisationId?: number;
  custodianId?: number;
  enableEmailCheck?: boolean;
  isProjectUser?: boolean;
  projectRoles?: Partial<Role>[];
  actions?: React.ReactNode;
}

export default function InviteUser({
  actions,
  onSuccess,
  organisationId: initialOrganisationId,
  custodianId,
  enableEmailCheck = true,
  projectRoles,
}: InviteUserFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tUser = useTranslations(NAMESPACE_TRANSLATION_ORGANISATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const queryClient = useQueryClient();
  const [selectOrganisation, setSelectOrganisation] = useState<boolean>(true);

  const {
    mutateAsync: mutateOrganisationUserInvite,
    ...organisationQueryState
  } = useMutation(postOrganisationInviteUserQuery());

  const { mutateAsync: mutateCustodianUserInvite, ...custodianQueryState } =
    useMutation(postCustodianInviteUserQuery());

  const {
    handleSubmit: handleCreateAndInviteOrganisation,
    queryState: inviteOrganisationQueryState,
  } = useOrganisationInvite();

  const combinedQueryState = getCombinedQueryState([
    organisationQueryState,
    custodianQueryState,
    inviteOrganisationQueryState,
  ]);

  useQueryAlerts(combinedQueryState);

  const checkEmailExists = async (email: string, useCache = false) => {
    const queryKey = ["getUsersByEmail", email];
    const cachedData = queryClient.getQueryData(queryKey);

    if (cachedData && useCache) {
      return cachedData.data.data.length > 0;
    }

    const fetchedData = await queryClient.fetchQuery({
      queryKey,
      queryFn: () => getUsers({ email }),
    });
    return fetchedData.data.data.length > 0;
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
        role: projectRoles
          ? yup.string().required(tForm("roleRequiredInvalid"))
          : yup.string().notRequired(),
        email: yup
          .string()
          .email(tForm("emailFormatInvalid"))
          .required(tForm("emailRequiredInvalid"))
          .test(
            "email-exists",
            tForm("emailAlreadyExists"),
            async function (value) {
              if (!enableEmailCheck) return true;

              if (!value) return true;

              try {
                const userExists = await checkEmailExists(value);
                return !userExists;
              } catch (err) {
                console.error("Error checking email existence", err);
                return true;
              }
            }
          ),
        organisation_id: selectOrganisation
          ? yup.string().required(tForm("organisationRequiredInvalid"))
          : yup.string().notRequired(),
        organisation_name: selectOrganisation
          ? yup.string().notRequired()
          : yup.string().required(tForm("organisationNameRequired")),
        organisation_email: selectOrganisation
          ? yup.string().notRequired()
          : yup
              .string()
              .email(tForm("emailInvalid"))
              .required(tForm("organisationEmailRequired")),
      }),
    [tForm, selectOrganisation]
  );

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      organisation_id: initialOrganisationId || "",
      organisation_name: "",
      organisation_email: "",
    },
  };

  const handleSubmit = async (formData: InviteUserFormValues) => {
    const {
      organisation_name,
      organisation_email,
      organisation_id,
      role,
      ...payload
    } = formData;

    let organisationId = organisation_id;

    if (organisation_name && organisation_email) {
      const invitePayload = {
        organisation_name,
        lead_applicant_email: organisation_email,
      };

      organisationId = await handleCreateAndInviteOrganisation(invitePayload);
    }

    let results;

    if (!custodianId) {
      results = await mutateOrganisationUserInvite({
        organisationId: organisationId as number,
        payload,
      });
    } else {
      results = await mutateCustodianUserInvite({
        organisationId: organisationId as number,
        payload,
      });
    }

    if (results.data) onSuccess?.(results.data, role);
  };

  return (
    <Form
      data-cy="invite-user"
      onSubmit={handleSubmit}
      schema={schema}
      {...formOptions}
      sx={{ mb: 3, maxWidth: MAX_FORM_WIDTH }}>
      {() => (
        <>
          <FormSection subtitle={tUser("inviteUserTitle")}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="first_name"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="last_name"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="email"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>

              {projectRoles && (
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="role"
                    renderField={fieldProps => (
                      <SelectRole roles={projectRoles} {...fieldProps} />
                    )}
                  />
                </Grid>
              )}

              {!initialOrganisationId &&
                (selectOrganisation ? (
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="organisation_id"
                      renderField={({ ...fieldProps }) => (
                        <SelectOrganisation {...fieldProps} />
                      )}
                      description={tProfile.rich("organisationNotListed", {
                        link: chunks => (
                          <Link
                            component="button"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectOrganisation(false);
                            }}
                            sx={{ pb: 0.25 }}>
                            {chunks}
                          </Link>
                        ),
                      })}
                    />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <FormControlWrapper
                        name="organisation_name"
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                        description={
                          <>
                            <Box mb={2}>
                              {tProfile("organisationNameSubtitle")}
                            </Box>
                            {tProfile.rich("organisationListed", {
                              link: chunks => (
                                <Link
                                  component="button"
                                  onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectOrganisation(true);
                                  }}
                                  sx={{ pb: 0.25 }}>
                                  {chunks}
                                </Link>
                              ),
                            })}
                          </>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlWrapper
                        name="organisation_email"
                        renderField={fieldProps => (
                          <TextField {...fieldProps} />
                        )}
                      />
                    </Grid>
                  </>
                ))}
            </Grid>
          </FormSection>
          <FormActions>
            {actions}
            <LoadingButton
              type="submit"
              endIcon={<SaveIcon />}
              loading={combinedQueryState.isLoading}
              sx={{ display: "flex", justifySelf: "end" }}>
              {tForm(`inviteButton`)}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
