"use client";

import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import useOrganisationStore from "@/queries/useOrganisationStore";
import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export default function SroInvite() {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);
  const { organisation } = useOrganisationStore();

  const sroOfficer = organisation?.sro_officer;
  const hasSroAssigned = Boolean(sroOfficer);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
            <Typography
              component="label"
              htmlFor="sro-invite-first-name"
              sx={{ display: "block", mb: 1 }}>
              {tOrgProfile("sroInviteFirstName")}{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="sro-invite-first-name"
              fullWidth
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              component="label"
              htmlFor="sro-invite-last-name"
              sx={{ display: "block", mb: 1 }}>
              {tOrgProfile("sroInviteLastName")}{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="sro-invite-last-name"
              fullWidth
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              component="label"
              htmlFor="sro-invite-email"
              sx={{ display: "block", mb: 1 }}>
              {tOrgProfile("sroInviteEmailAddress")}{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              id="sro-invite-email"
              fullWidth
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
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
