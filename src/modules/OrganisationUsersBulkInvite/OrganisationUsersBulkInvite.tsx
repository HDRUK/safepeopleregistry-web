import InviteUserModal from "@/organisms/InviteUserModal";
import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UserBulkInvite from "../../components/UserBulkInvite";
import { Organisation } from "../../types/application";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

interface OrganisationUsersBulkInviteProps {
  organisation: Organisation;
  onSuccess?: () => void;
}

export default function OrganisationUsersBulkInvite({
  organisation,
  onSuccess,
}: OrganisationUsersBulkInviteProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
      <div>
        <Button
          variant="outlined"
          aria-label="modal-button"
          onClick={() => setOpen(true)}>
          {t("inviteNewUserButton")}
        </Button>
      </div>
      <UserBulkInvite organisation_id={organisation.id} />

      <InviteUserModal
        organisationId={organisation.id}
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          onSuccess?.();
        }}
      />
    </Box>
  );
}
