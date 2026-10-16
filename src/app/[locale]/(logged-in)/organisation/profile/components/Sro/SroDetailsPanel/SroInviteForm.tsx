import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import { PendingSro, User } from "@/types/application";
import { getName } from "@/utils/application";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import DelegatePicker from "./DelegatePicker";
import { SroInvitee } from "./useSroActions";

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

type SroInviteMode = "new" | "existingDelegate";

export interface SroInviteFormValues {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}

interface SroInviteFormProps {
  // first: the organisation has no SRO. replacePending: inviting someone instead of a pending
  // invitee. replacement: the SRO inviting their own replacement, new person only.
  purpose: "first" | "replacePending" | "replacement";
  pendingSro?: PendingSro | null;
  delegates: User[];
  onBack: () => void;
  onInvite: (invitee: SroInvitee) => void;
  onAppoint: (delegate: User) => void;
}

export default function SroInviteForm({
  purpose,
  pendingSro,
  delegates,
  onBack,
  onInvite,
  onAppoint,
}: SroInviteFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  // An SRO hands over to an existing delegate from their own card instead.
  const canChooseDelegate = purpose !== "replacement";
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

  const formOptions = {
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  };

  const isDelegateMissing = mode === "existingDelegate" && !selectedDelegate;

  const handleSubmit = (values: SroInviteFormValues) => {
    if (mode === "new") {
      // The schema requires all three in this mode.
      onInvite({
        first_name: values.first_name as string,
        last_name: values.last_name as string,
        email: values.email as string,
      });
      return;
    }

    if (selectedDelegate) {
      onAppoint(selectedDelegate);
    }
  };

  return (
    <PageBody heading={tOrgProfile("sroInviteTitle")}>
      <Form
        aria-label={tOrgProfile("sroInviteTitle")}
        schema={schema}
        {...formOptions}
        onSubmit={handleSubmit}>
        <PageSection
          description={tOrgProfile(
            purpose === "replacement"
              ? "sroInviteReplacementDescription"
              : "sroInviteNoOfficerDescription"
          )}>
          {purpose === "replacePending" && pendingSro && (
            <Button variant="outlined" sx={{ mb: 2 }} onClick={onBack}>
              {tOrgProfile("sroKeepPendingInviteButton", {
                name: getName(pendingSro),
              })}
            </Button>
          )}
          <Grid container rowSpacing={3}>
            {canChooseDelegate && (
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
            {purpose === "replacement" && (
              <Button variant="outlined" sx={{ mb: 2 }} onClick={onBack}>
                {tOrgProfile("sroInviteReplacementBackButton")}
              </Button>
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
