import ChipStatus from "@/components/ChipStatus";
import { Status } from "@/consts/application";
import InviteOrganisationModal from "@/organisms/InviteOrganisationModal";
import {
  Organisation,
  ResearcherProject,
  WithTranslations,
} from "@/types/application";
import { getSponsorshipStatus } from "@/utils/application";
import { Button } from "@mui/material";
import { useState } from "react";

export type InviteSponsorProps = WithTranslations<{
  onSuccess: (id: number) => void;
  selectedOrganisation: Organisation | undefined;
  project: ResearcherProject;
}>;

export default function InviteSponsor({
  selectedOrganisation,
  onSuccess,
  project,
  t,
}: InviteSponsorProps) {
  const [showInviteModal, setShowInviteModel] = useState(false);
  const status = getSponsorshipStatus(selectedOrganisation, project);

  return (
    <div>
      {status && <ChipStatus status={status} sx={{ mr: 1 }} />}
      {status !== Status.SPONSORSHIP_APPROVED && (
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setShowInviteModel(true)}>
          {status !== Status.INVITED
            ? t("inviteSponsorButton")
            : t("resendInviteSponsorButton")}
        </Button>
      )}
      <InviteOrganisationModal
        open={showInviteModal}
        onClose={() => setShowInviteModel(false)}
        onSuccess={(id: number) => {
          setShowInviteModel(false);

          onSuccess(id);
        }}
        t={t}
      />
    </div>
  );
}
