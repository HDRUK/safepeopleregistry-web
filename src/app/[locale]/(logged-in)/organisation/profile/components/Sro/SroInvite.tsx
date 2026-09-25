"use client";

import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import useOrganisationStore from "@/queries/useOrganisationStore";
import getOrganisationDelegatesQuery from "@/services/organisations/getOrganisationDelegatesQuery";
import { User } from "@/types/application";
import { getName } from "@/utils/application";
import {
  Autocomplete,
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

interface SroInviteProps {
  hasSroAssigned: boolean;
}

export default function SroInvite({ hasSroAssigned }: SroInviteProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);
  const { organisation } = useOrganisationStore();

  const sroOfficer = organisation?.sro_officer;

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

  const { data: delegatesData } = useQuery(
    getOrganisationDelegatesQuery(
      organisation?.id as number,
      Boolean(organisation?.id)
    )
  );
  const delegates = delegatesData?.data || [];

  const handleSendInvite = () => {};

  const handleResendInvite = () => {};

  const handleSave = () => {};

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
                {sroOfficer?.first_name} {sroOfficer?.last_name}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedEmail")}
              </Typography>
              <Typography>{sroOfficer?.email}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedDepartment")}
              </Typography>
              <Typography>{sroOfficer?.departments?.[0]?.name}</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {tOrgProfile("sroAssignedJobTitle")}
              </Typography>
              <Typography>{sroOfficer?.role}</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: "29px" }}>
            <Grid size={{ xs: 12 }}>
              <Chip color="success" label={tOrgProfile("sroInviteSentChip")} />
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ pt: "29px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResendInvite}>
                {tOrgProfile("sroResendInviteButton")}
              </Button>
            </Grid>
          </Grid>
          <FormActions>
            <ProfileNavigationFooter
              previousHref={
                ROUTES.profileOrganisationDetailsSecurityCompliance.path
              }
              onClick={handleSave}
            />
          </FormActions>
        </PageSection>
      </PageBody>
    );
  }

  return (
    <PageBody heading={tOrgProfile("sroInviteTitle")}>
      <PageSection description={tOrgProfile("sroInviteNoOfficerDescription")}>
        <Typography sx={{ mt: 2, mb: 2 }}>
          {tOrgProfile("sroInviteProvideDetails")}
        </Typography>
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
              <Form
                schema={schema}
                defaultValues={{ first_name: "", last_name: "", email: "" }}>
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
              </Form>
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

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendInvite}>
              {tOrgProfile("sroInviteSendButton")}
            </Button>
          </Grid>
        </Grid>

        <FormActions>
          <ProfileNavigationFooter
            previousHref={
              ROUTES.profileOrganisationDetailsSecurityCompliance.path
            }
            onClick={handleSave}
          />
        </FormActions>
      </PageSection>
    </PageBody>
  );
}
