import FormActions from "@/components/FormActions";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { ROUTES } from "@/consts/router";
import { PageBody, PageSection } from "@/modules";
import SroDeclaration from "@/organisms/SroDeclaration";
import { PendingSro, User } from "@/types/application";
import { Box, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DelegatePicker from "./DelegatePicker";
import { SentChip } from "./PendingSroCard";
import SroDetails from "./SroDetails";
import { MAX_FORM_WIDTH } from "@/consts/form";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

interface ClaimedSroCardProps {
  sro: User;
  // Only the SRO themselves can hand the role over or invite their replacement.
  isSignedInSro: boolean;
  // The SRO's invited replacement, shown only to the SRO.
  pendingReplacement?: PendingSro | null;
  delegates: User[];
  onHandOver: (delegate: User, onSuccess: () => void) => void;
  onInviteReplacement: () => void;
  onResendReplacementInvite: (invitee: PendingSro) => void;
}

export default function ClaimedSroCard({
  sro,
  isSignedInSro,
  pendingReplacement,
  delegates,
  onHandOver,
  onInviteReplacement,
  onResendReplacementInvite,
}: ClaimedSroCardProps) {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);

  const [isHandingOver, setIsHandingOver] = useState(false);
  const [handOverTo, setHandOverTo] = useState<User | null>(null);

  const stopHandingOver = () => {
    setIsHandingOver(false);
    setHandOverTo(null);
  };

  return (
    <PageBody heading={tOrgProfile("sroInviteTitle")}>
      <PageSection description={tOrgProfile("sroAssignedDescription")}>
        <Typography sx={{ mt: 2, mb: 2 }}>
          {tOrgProfile("sroAssignedIntro")}
        </Typography>
        <SroDetails sro={sro} />

        {isSignedInSro && !isHandingOver && (
          <Box sx={{ pt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Button variant="outlined" onClick={() => setIsHandingOver(true)}>
              {tOrgProfile("sroHandOverButton")}
            </Button>
            {!pendingReplacement && (
              <Button variant="outlined" onClick={onInviteReplacement}>
                {tOrgProfile("sroInviteReplacementButton")}
              </Button>
            )}
          </Box>
        )}

        {isSignedInSro && isHandingOver && (
          <Box
            sx={{ pt: 3, display: "grid", gap: 2, maxWidth: MAX_FORM_WIDTH }}>
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
                onClick={() =>
                  handOverTo && onHandOver(handOverTo, stopHandingOver)
                }>
                {tOrgProfile("sroHandOverSubmitButton")}
              </Button>
              <Button variant="text" onClick={stopHandingOver}>
                {tOrgProfile("sroHandOverCancelButton")}
              </Button>
            </Box>
          </Box>
        )}

        {isSignedInSro && pendingReplacement && (
          <Box sx={{ pt: 4, display: "grid", gap: 2, justifyItems: "start" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {tOrgProfile("sroReplacementPendingIntro")}
            </Typography>
            <SroDetails sro={pendingReplacement} showProfile={false} />
            <SentChip invitee={pendingReplacement} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => onResendReplacementInvite(pendingReplacement)}>
                {tOrgProfile("sroResendInvitationButton")}
              </Button>
              <Button variant="outlined" onClick={onInviteReplacement}>
                {tOrgProfile("sroInviteSomeoneElseButton")}
              </Button>
            </Box>
          </Box>
        )}

        {isSignedInSro && (
          <Box sx={{ pt: 4 }}>
            <SroDeclaration isDelegate={false} />
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
