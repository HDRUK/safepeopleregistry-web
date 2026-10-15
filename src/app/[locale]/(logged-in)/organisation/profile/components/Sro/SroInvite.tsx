"use client";

import postOrganisationSroInvite from "@/app/actions/organisations/postOrganisationSroInvite";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { PageBody, PageSection } from "@/modules";
import useOrganisationStore from "@/queries/useOrganisationStore";
import getOrganisationDelegatesQuery from "@/services/organisations/getOrganisationDelegatesQuery";
import { User } from "@/types/application";
import { getName } from "@/utils/application";
import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

type SroInviteMode = "new" | "existingDelegate";

export interface SroInviteFormValues {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}

interface SroInviteProps {
  hasSroAssigned: boolean;
}

export default function SroInvite({ hasSroAssigned }: SroInviteProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);
  const { organisation, refetch: refetchOrganisation } = useOrganisationStore();
  const { showAlert, hideAlert } = useAlertModal();

  const claimedSro = organisation?.claimed_sro;

  const [mode, setMode] = useState<SroInviteMode>("new");
  const [selectedDelegate, setSelectedDelegate] = useState<User | null>(null);

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name:
          mode === "new"
            ? yup.string().required(tForm("firstNameRequiredInvalid"))
            : yup.string().nullable(),
        last_name:
          mode === "new"
            ? yup.string().required(tForm("lastNameRequiredInvalid"))
            : yup.string().nullable(),
        email:
          mode === "new"
            ? yup
                .string()
                .email(tForm("emailInvalid"))
                .required(tForm("emailRequired"))
            : yup.string().nullable(),
      }),
    [tForm, mode]
  );

  const { data: delegatesData, refetch: refetchDelegates } = useQuery(
    getOrganisationDelegatesQuery(
      organisation?.id as number,
      Boolean(organisation?.id)
    )
  );
  const delegates = delegatesData?.data || [];

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  };

  const isDelegateMissing = mode === "existingDelegate" && !selectedDelegate;

  const appointDelegate = async (delegate: User) => {
    try {
      await putOrganisationSro(organisation?.id as number, delegate.id);
    } catch {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={tOrgProfile} tKey="sroAppointDelegateError" />,
        confirmButtonText: tOrgProfile("sroAppointDelegateDoneButton"),
        onConfirm: async () => hideAlert(),
      });
      return;
    }

    showAlert({
      severity: "success",
      text: tOrgProfile("sroAppointDelegateSuccess", {
        name: getName(delegate),
      }),
      confirmButtonText: tOrgProfile("sroAppointDelegateDoneButton"),
      onConfirm: async () => hideAlert(),
    });

    // The organisation now has a claimed SRO, so Sro shows the assigned SRO instead of this form.
    await Promise.all([refetchOrganisation(), refetchDelegates()]);
  };

  const inviteSro = async (invitee: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    const showError = (tKey: string) =>
      showAlert({
        severity: "error",
        text: <ErrorMessage t={tOrgProfile} tKey={tKey} />,
        confirmButtonText: tOrgProfile("sroInviteDoneButton"),
        onConfirm: async () => hideAlert(),
      });

    let response;

    try {
      response = await postOrganisationSroInvite(
        organisation?.id as number,
        invitee,
        { suppressThrow: true }
      );
    } catch {
      showError("sroInviteError");
      return;
    }

    if (!response.ok) {
      // 409: the email already has an account, so they should be appointed instead.
      showError(
        response.status === 409
          ? "sroInviteExistingAccountError"
          : "sroInviteError"
      );
      return;
    }

    showAlert({
      severity: "success",
      text: tOrgProfile("sroInviteSuccess", { name: getName(invitee) }),
      confirmButtonText: tOrgProfile("sroInviteDoneButton"),
      onConfirm: async () => hideAlert(),
    });

    await refetchOrganisation();
  };

  const handleSendInvite = (values: SroInviteFormValues) => {
    if (mode === "new") {
      // The schema requires all three in this mode.
      const invitee = {
        first_name: values.first_name as string,
        last_name: values.last_name as string,
        email: values.email as string,
      };

      // Inviting emails someone outside the organisation, so confirm first.
      showAlert({
        severity: "warning",
        title: tOrgProfile("sroInviteConfirmTitle"),
        text: tOrgProfile("sroInviteConfirmText", { name: getName(invitee) }),
        confirmButtonText: tOrgProfile("sroInviteConfirmButton"),
        cancelButtonText: tOrgProfile("sroInviteCancelButton"),
        onConfirm: async () => {
          hideAlert();
          await inviteSro(invitee);
        },
        onCancel: () => hideAlert(),
      });

      return;
    }

    if (!selectedDelegate) {
      return;
    }

    // Appointing changes someone's role and emails the organisation, so confirm first.
    showAlert({
      severity: "warning",
      title: tOrgProfile("sroAppointDelegateConfirmTitle"),
      text: tOrgProfile("sroAppointDelegateConfirmText", {
        name: getName(selectedDelegate),
      }),
      confirmButtonText: tOrgProfile("sroAppointDelegateConfirmButton"),
      cancelButtonText: tOrgProfile("sroAppointDelegateCancelButton"),
      onConfirm: async () => {
        hideAlert();
        await appointDelegate(selectedDelegate);
      },
      onCancel: () => hideAlert(),
    });
  };

  if (hasSroAssigned) {
    return (
      <PageBody heading={tOrgProfile("sroInviteTitle")}>
        <PageSection description={tOrgProfile("sroAssignedDescription")}>
          <Typography sx={{ mt: 2, mb: 2 }}>
            {tOrgProfile("sroAssignedIntro")}
          </Typography>
          <Grid container rowSpacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedName")}
              </Typography>
              <Typography>
                {claimedSro?.first_name} {claimedSro?.last_name}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedEmail")}
              </Typography>
              <Typography>{claimedSro?.email || "-"}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedDepartment")}
              </Typography>
              <Typography>
                {claimedSro?.departments?.[0]?.name || "-"}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedJobTitle")}
              </Typography>
              <Typography>{claimedSro?.role || "-"}</Typography>
            </Grid>
          </Grid>
          <FormActions>
            <ProfileNavigationFooter
              previousHref={
                ROUTES.profileOrganisationDetailsSecurityCompliance.path
              }
              hideSubmitButton
            />
          </FormActions>
        </PageSection>
      </PageBody>
    );
  }

  return (
    <PageBody heading={tOrgProfile("sroInviteTitle")}>
      <Form
        aria-label={tOrgProfile("sroInviteTitle")}
        schema={schema}
        {...formOptions}
        onSubmit={handleSendInvite}>
        <PageSection description={tOrgProfile("sroInviteNoOfficerDescription")}>
          <Grid container rowSpacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroInviteModeLabel")}
              </Typography>
              <RadioGroup
                row
                value={mode}
                onChange={e => setMode(e.target.value as SroInviteMode)}>
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label={tOrgProfile("sroInviteModeNew")}
                />
                <FormControlLabel
                  value="existingDelegate"
                  control={<Radio />}
                  label={tOrgProfile("sroInviteModeExisting")}
                />
              </RadioGroup>
            </Grid>

            {mode === "new" ? (
              <Grid size={{ xs: 12 }}>
                <Grid container rowSpacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="first_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="last_name"
                      renderField={fieldProps => <TextField {...fieldProps} />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControlWrapper
                      name="email"
                      label={tOrgProfile("sroInviteEmailAddress")}
                      renderField={fieldProps => (
                        <TextField {...fieldProps} type="email" />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid size={{ xs: 12 }}>
                <Typography
                  component="label"
                  htmlFor="sro-invite-select-delegate"
                  sx={{ display: "block", mb: 1 }}>
                  {tOrgProfile("sroInviteSelectDelegateLabel")}{" "}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <Autocomplete
                  id="sro-invite-select-delegate"
                  options={delegates}
                  getOptionLabel={option => getName(option)}
                  isOptionEqualToValue={(option, selected) =>
                    option.id === selected.id
                  }
                  value={selectedDelegate}
                  onChange={(_, newValue) => setSelectedDelegate(newValue)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      required
                      placeholder={tOrgProfile(
                        "sroInviteSelectDelegatePlaceholder"
                      )}
                    />
                  )}
                />
              </Grid>
            )}

            {mode === "existingDelegate" && selectedDelegate && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    component="label"
                    htmlFor="sro-invite-selected-delegate-first-name"
                    sx={{ display: "block", mb: 1 }}>
                    {tOrgProfile("sroInviteFirstName")}
                  </Typography>
                  <TextField
                    id="sro-invite-selected-delegate-first-name"
                    fullWidth
                    disabled
                    value={selectedDelegate.first_name}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    component="label"
                    htmlFor="sro-invite-selected-delegate-last-name"
                    sx={{ display: "block", mb: 1 }}>
                    {tOrgProfile("sroInviteLastName")}
                  </Typography>
                  <TextField
                    id="sro-invite-selected-delegate-last-name"
                    fullWidth
                    disabled
                    value={selectedDelegate.last_name}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    component="label"
                    htmlFor="sro-invite-selected-delegate-email"
                    sx={{ display: "block", mb: 1 }}>
                    {tOrgProfile("sroInviteEmailAddress")}
                  </Typography>
                  <TextField
                    id="sro-invite-selected-delegate-email"
                    fullWidth
                    disabled
                    value={selectedDelegate.email}
                  />
                </Grid>
              </>
            )}
          </Grid>

          <FormActions
            sx={{
              "& .MuiButton-root:disabled .MuiSvgIcon-root": {
                color: "inherit",
              },
            }}>
            <ProfileNavigationFooter
              previousHref={
                ROUTES.profileOrganisationDetailsSecurityCompliance.path
              }
              isDisabled={isDelegateMissing}
              submitButtonText={tOrgProfile("sroInviteSendButton")}
            />
          </FormActions>
        </PageSection>
      </Form>
    </PageBody>
  );
}
