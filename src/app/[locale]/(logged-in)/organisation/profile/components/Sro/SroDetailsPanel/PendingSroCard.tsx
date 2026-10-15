import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import { PendingSro } from "@/types/application";
import { formatDisplayLongDate } from "@/utils/date";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import SroDetails from "./SroDetails";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export function SentChip({ invitee }: { invitee: PendingSro }) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <Chip
      color="success"
      label={`${tOrgProfile("sroInviteSentChip")} ${formatDisplayLongDate(
        invitee.pending_sro_invite?.invite_sent_at
      )}`}
    />
  );
}

interface PendingSroCardProps {
  sro: PendingSro;
  onResend: () => void;
  onInviteSomeoneElse: () => void;
}

// The organisation has invited an SRO who has not yet claimed their account, and has no SRO.
export default function PendingSroCard({
  sro,
  onResend,
  onInviteSomeoneElse,
}: PendingSroCardProps) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  return (
    <PageBody heading={tOrgProfile("sroInviteTitle")}>
      <PageSection description={tOrgProfile("sroAssignedDescription")}>
        <Typography sx={{ mt: 2, mb: 2 }}>
          {tOrgProfile("sroPendingIntro")}
        </Typography>
        <SroDetails sro={sro} showProfile={false} />
        <Grid
          container
          sx={{ pt: "29px" }}
          direction="column"
          alignItems="flex-start"
          spacing={2}>
          <Grid>
            <SentChip invitee={sro} />
          </Grid>
          <Grid>
            <Button variant="outlined" onClick={onInviteSomeoneElse}>
              {tOrgProfile("sroInviteSomeoneElseButton")}
            </Button>
          </Grid>
        </Grid>
        <FormActions>
          <ProfileNavigationFooter
            previousHref={
              ROUTES.profileOrganisationDetailsSecurityCompliance.path
            }
            onClick={onResend}
            submitButtonText={tOrgProfile("sroResendInviteButton")}
          />
        </FormActions>
      </PageSection>
    </PageBody>
  );
}
