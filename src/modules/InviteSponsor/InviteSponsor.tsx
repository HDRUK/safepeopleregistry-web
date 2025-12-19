import ChipStatus from "@/components/ChipStatus";
import Text from "@/components/Text";
import { Status } from "@/consts/application";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import InviteOrganisationModal from "@/organisms/InviteOrganisationModal";
import { putResendInviteSponorshipQuery } from "@/services/projects";
import {
  Organisation,
  ResearcherProject,
  WithTranslations,
} from "@/types/application";
import { getSponsorshipStatus } from "@/utils/application";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Link } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export type InviteSponsorProps = WithTranslations<{
  onSuccess: (id: number) => void;
  selectedOrganisation: Organisation | undefined;
  project: ResearcherProject;
  onChangeOrganisation: () => void;
  enableChange: boolean;
}>;

export default function InviteSponsor({
  selectedOrganisation,
  onSuccess,
  project,
  t,
  enableChange,
  onChangeOrganisation,
}: InviteSponsorProps) {
  const [showInviteModal, setShowInviteModel] = useState(false);
  const status = getSponsorshipStatus(selectedOrganisation, project);
  const { mutate, ...mutationState } = useMutation(
    putResendInviteSponorshipQuery()
  );

  useQueryAlerts(mutationState);

  return (
    <div data-cy="invite-sponsor">
      {status !== Status.SPONSORSHIP_APPROVED ? (
        <div>
          {enableChange ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div>
                {status && <ChipStatus status={status} sx={{ mr: 1 }} />}

                {status === Status.INVITED && (
                  <Link
                    component="button"
                    onClick={() => {
                      if (selectedOrganisation) {
                        mutate({
                          params: {
                            organisationId: selectedOrganisation.id,
                          },
                        });
                      }
                    }}>
                    <Text startIcon={<MailOutlineIcon />} fontSize="inherit">
                      {t("resendInviteSponsorButton")}
                    </Text>
                  </Link>
                )}
              </div>

              <div>
                <Link
                  component="button"
                  onClick={onChangeOrganisation}
                  fontSize="inherit">
                  Change sponsor
                </Link>
              </div>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {status === Status.SPONSORSHIP_REJECTED && (
                <ChipStatus status={status} />
              )}
              <Text
                fontSize="inherit"
                endIcon={
                  <Link
                    component="button"
                    onClick={e => {
                      e.preventDefault();
                      setShowInviteModel(true);
                    }}>
                    {t("inviteSponsorButton")}
                  </Link>
                }>
                Organisation not listed?
              </Text>
            </Box>
          )}
        </div>
      ) : (
        <ChipStatus status={status} sx={{ mr: 1 }} />
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
