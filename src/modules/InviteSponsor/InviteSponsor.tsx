import ChipStatus from "@/components/ChipStatus";
import InviteOrganisationModal from "@/organisms/InviteOrganisationModal";
import { Organisation, WithTranslations } from "@/types/application";
import { Button } from "@mui/material";
import { useState } from "react";

export type InviteSponsorProps = WithTranslations<{
  onSuccess: (id: number) => void;
  selectedOrganisation: Organisation | undefined;
}>;

export default function InviteSponsor({
  selectedOrganisation,
  onSuccess,
  t,
}: InviteSponsorProps) {
  const [showInviteModal, setShowInviteModel] = useState(false);

  const status = selectedOrganisation?.model_state?.state.slug;

  return (
    <div>
      {status && <ChipStatus status={status} sx={{ mr: 1 }} />}
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setShowInviteModel(true)}>
        {t("inviteSponsorButton")}
      </Button>
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
