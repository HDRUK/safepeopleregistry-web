"use client";

import postOrganisationSroInvite from "@/app/actions/organisations/postOrganisationSroInvite";
import postOrganisationSroResendInvite from "@/app/actions/organisations/postOrganisationSroResendInvite";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import ErrorMessage from "@/components/ErrorMessage";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import { PageBody, PageSection } from "@/modules";
import useOrganisationStore from "@/queries/useOrganisationStore";
import getOrganisationDelegatesQuery from "@/services/organisations/getOrganisationDelegatesQuery";
import { getUserQuery } from "@/services/users";
import { PendingSro, User } from "@/types/application";
import { getName } from "@/utils/application";
import { formatDisplayLongDate } from "@/utils/date";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
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

// An invited SRO has not filled in their profile yet, so has no department or job title to show.
function SroDetails({
  sro,
  showProfile = true,
}: {
  sro: User;
  showProfile?: boolean;
}) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <Grid container rowSpacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {tOrgProfile("sroAssignedName")}
        </Typography>
        <Typography>
          {sro.first_name} {sro.last_name}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {tOrgProfile("sroAssignedEmail")}
        </Typography>
        <Typography>{sro.email || "-"}</Typography>
      </Grid>
      {showProfile && (
        <>
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {tOrgProfile("sroAssignedDepartment")}
            </Typography>
            <Typography>{sro.departments?.[0]?.name || "-"}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {tOrgProfile("sroAssignedJobTitle")}
            </Typography>
            <Typography>{sro.role || "-"}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

function DelegatePicker({
  id,
  delegates,
  value,
  onChange,
}: {
  id: string;
  delegates: User[];
  value: User | null;
  onChange: (delegate: User | null) => void;
}) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <>
      <Typography
        component="label"
        htmlFor={id}
        sx={{ display: "block", mb: 1 }}>
        {tOrgProfile("sroInviteSelectDelegateLabel")}{" "}
        <span style={{ color: "red" }}>*</span>
      </Typography>
      <Autocomplete
        id={id}
        options={delegates}
        getOptionLabel={option => getName(option)}
        isOptionEqualToValue={(option, selected) => option.id === selected.id}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            required
            placeholder={tOrgProfile("sroInviteSelectDelegatePlaceholder")}
          />
        )}
      />
    </>
  );
}

// Shows the organisation's claimed SRO; otherwise its invited SRO, with resend; otherwise the
// form to invite or appoint one.
export default function SroInvite() {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);
  const { organisation, refetch: refetchOrganisation } = useOrganisationStore();
  const { showAlert, hideAlert } = useAlertModal();

  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));
  const { refetch: refetchUser } = useQuery({
    ...getUserQuery(user?.id as number),
    enabled: false,
  });

  const claimedSro = organisation?.claimed_sro;
  const pendingSro = organisation?.pending_sro;

  // Only the SRO themselves can hand the role over or invite their replacement from here.
  const isSignedInSro = !!user && !!claimedSro && user.id === claimedSro.id;
  const [isHandingOver, setIsHandingOver] = useState(false);
  const [handOverTo, setHandOverTo] = useState<User | null>(null);

  // The SRO inviting someone new to replace them shows the invite form, new person only.
  const [isInvitingReplacement, setIsInvitingReplacement] = useState(false);

  // While an SRO invitation is pending, the form is only shown to invite someone else instead.
  const [isReplacingPendingSro, setIsReplacingPendingSro] = useState(false);

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

  const stopHandingOver = () => {
    setIsHandingOver(false);
    setHandOverTo(null);
  };

  const handOver = async (delegate: User) => {
    try {
      await putOrganisationSro(organisation?.id as number, delegate.id);
    } catch {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={tOrgProfile} tKey="sroHandOverError" />,
        confirmButtonText: tOrgProfile("sroInviteDoneButton"),
        onConfirm: async () => hideAlert(),
      });
      return;
    }

    showAlert({
      severity: "success",
      text: tOrgProfile("sroHandOverSuccess", { name: getName(delegate) }),
      confirmButtonText: tOrgProfile("sroInviteDoneButton"),
      onConfirm: async () => hideAlert(),
    });

    stopHandingOver();

    // The signed-in user is now a delegate, so refresh them as well as the organisation.
    const [, , refreshedUser] = await Promise.all([
      refetchOrganisation(),
      refetchDelegates(),
      refetchUser(),
    ]);

    if (refreshedUser.data?.data) {
      setUser(refreshedUser.data.data);
    }
  };

  const confirmHandOver = () => {
    if (!handOverTo) {
      return;
    }

    // Handing over changes the signed-in user's own role and emails the organisation.
    showAlert({
      severity: "warning",
      title: tOrgProfile("sroHandOverConfirmTitle"),
      text: tOrgProfile("sroHandOverConfirmText", {
        name: getName(handOverTo),
      }),
      confirmButtonText: tOrgProfile("sroHandOverConfirmButton"),
      cancelButtonText: tOrgProfile("sroHandOverCancelButton"),
      onConfirm: async () => {
        hideAlert();
        await handOver(handOverTo);
      },
      onCancel: () => hideAlert(),
    });
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

    setIsReplacingPendingSro(false);
    setIsInvitingReplacement(false);
    await refetchOrganisation();
  };

  const startInvitingReplacement = () => {
    setMode("new");
    setIsInvitingReplacement(true);
  };

  const sentChipLabel = (invitee: PendingSro) =>
    `${tOrgProfile("sroInviteSentChip")} ${formatDisplayLongDate(
      invitee.pending_sro_invite?.invite_sent_at
    )}`;

  const resendInvite = async (invitee: User) => {
    let response;

    try {
      response = await postOrganisationSroResendInvite(
        organisation?.id as number,
        { suppressThrow: true }
      );
    } catch {
      response = undefined;
    }

    if (!response?.ok) {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={tOrgProfile} tKey="sroResendInviteError" />,
        confirmButtonText: tOrgProfile("sroInviteDoneButton"),
        onConfirm: async () => hideAlert(),
      });
      return;
    }

    showAlert({
      severity: "success",
      text: tOrgProfile("sroResendInviteSuccess", { name: getName(invitee) }),
      confirmButtonText: tOrgProfile("sroInviteDoneButton"),
      onConfirm: async () => hideAlert(),
    });

    // Updates when the invitation was last sent.
    await refetchOrganisation();
  };

  // What sending this invitation will do. An earlier invitee keeps their invitation but will
  // join as a delegate, and an SRO inviting their replacement stays SRO until they claim.
  const inviteConfirmText = (invitee: {
    first_name: string;
    last_name: string;
  }) => {
    const names = {
      name: getName(invitee),
      ...(pendingSro && { pendingName: getName(pendingSro) }),
    };

    if (isInvitingReplacement) {
      return pendingSro
        ? tOrgProfile("sroInviteReplacementReplacesPendingConfirmText", names)
        : tOrgProfile("sroInviteReplacementConfirmText", names);
    }

    return pendingSro
      ? tOrgProfile("sroInviteReplacesPendingConfirmText", names)
      : tOrgProfile("sroInviteConfirmText", names);
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
        text: inviteConfirmText(invitee),
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

  if (claimedSro && !isInvitingReplacement) {
    return (
      <PageBody heading={tOrgProfile("sroInviteTitle")}>
        <PageSection description={tOrgProfile("sroAssignedDescription")}>
          <Typography sx={{ mt: 2, mb: 2 }}>
            {tOrgProfile("sroAssignedIntro")}
          </Typography>
          <SroDetails sro={claimedSro} />
          {isSignedInSro && !isHandingOver && (
            <Box sx={{ pt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button variant="outlined" onClick={() => setIsHandingOver(true)}>
                {tOrgProfile("sroHandOverButton")}
              </Button>
              {!pendingSro && (
                <Button variant="outlined" onClick={startInvitingReplacement}>
                  {tOrgProfile("sroInviteReplacementButton")}
                </Button>
              )}
            </Box>
          )}
          {isSignedInSro && pendingSro && (
            <Box sx={{ pt: 4, display: "grid", gap: 2, justifyItems: "start" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroReplacementPendingIntro")}
              </Typography>
              <SroDetails sro={pendingSro} showProfile={false} />
              <Chip color="success" label={sentChipLabel(pendingSro)} />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => resendInvite(pendingSro)}>
                  {tOrgProfile("sroResendInvitationButton")}
                </Button>
                <Button variant="outlined" onClick={startInvitingReplacement}>
                  {tOrgProfile("sroInviteSomeoneElseButton")}
                </Button>
              </Box>
            </Box>
          )}
          {isSignedInSro && isHandingOver && (
            <Box sx={{ pt: 3, display: "grid", gap: 2, maxWidth: 480 }}>
              <div>
                <DelegatePicker
                  id="sro-hand-over-select-delegate"
                  delegates={delegates}
                  value={handOverTo}
                  onChange={setHandOverTo}
                />
              </div>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  disabled={!handOverTo}
                  onClick={confirmHandOver}>
                  {tOrgProfile("sroHandOverSubmitButton")}
                </Button>
                <Button variant="text" onClick={stopHandingOver}>
                  {tOrgProfile("sroHandOverCancelButton")}
                </Button>
              </Box>
            </Box>
          )}
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

  // An SRO inviting their replacement goes straight to the form, even with one pending.
  if (pendingSro && !isReplacingPendingSro && !isInvitingReplacement) {
    return (
      <PageBody heading={tOrgProfile("sroInviteTitle")}>
        <PageSection description={tOrgProfile("sroAssignedDescription")}>
          <Typography sx={{ mt: 2, mb: 2 }}>
            {tOrgProfile("sroPendingIntro")}
          </Typography>
          <SroDetails sro={pendingSro} showProfile={false} />
          <Grid
            container
            sx={{ pt: "29px" }}
            direction="column"
            alignItems="flex-start"
            spacing={2}>
            <Grid>
              <Chip color="success" label={sentChipLabel(pendingSro)} />
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                onClick={() => setIsReplacingPendingSro(true)}>
                {tOrgProfile("sroInviteSomeoneElseButton")}
              </Button>
            </Grid>
          </Grid>
          <FormActions>
            <ProfileNavigationFooter
              previousHref={
                ROUTES.profileOrganisationDetailsSecurityCompliance.path
              }
              onClick={() => resendInvite(pendingSro)}
              submitButtonText={tOrgProfile("sroResendInviteButton")}
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
        <PageSection
          description={tOrgProfile(
            isInvitingReplacement
              ? "sroInviteReplacementDescription"
              : "sroInviteNoOfficerDescription"
          )}>
          {isInvitingReplacement && (
            <Button
              variant="text"
              sx={{ mb: 2 }}
              onClick={() => setIsInvitingReplacement(false)}>
              {tOrgProfile("sroInviteReplacementBackButton")}
            </Button>
          )}
          {pendingSro && !isInvitingReplacement && (
            <Button
              variant="text"
              sx={{ mb: 2 }}
              onClick={() => setIsReplacingPendingSro(false)}>
              {tOrgProfile("sroKeepPendingInviteButton", {
                name: getName(pendingSro),
              })}
            </Button>
          )}
          <Grid container rowSpacing={3}>
            {/* An SRO hands over to an existing delegate from their own card instead. */}
            {!isInvitingReplacement && (
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
            )}

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
                <DelegatePicker
                  id="sro-invite-select-delegate"
                  delegates={delegates}
                  value={selectedDelegate}
                  onChange={setSelectedDelegate}
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
