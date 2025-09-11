import { useStore } from "@/data/store";
import { mockedPendingAffiliations } from "@/mocks/data/cms";
import { Box, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ResearcherAffiliation } from "@/types/application";
import ActionsPanel from "../../components/ActionsPanel";
import { RejectIcon, VerifyIcon } from "../../consts/icons";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { putRegistryHasAffiliationQuery } from "../../services/affiliations";
import { AffiliationStatus } from "../../services/affiliations/types";

const NAMESPACE_TRANSLATION = "ConfirmAffiliation";

interface ConfirmAffiliationProps {
  affiliation: ResearcherAffiliation;
}

export default function ConfirmAffiliation({
  affiliation,
}: ConfirmAffiliationProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const currentUser = useStore(state => state.getCurrentUser());
  const queryClient = useQueryClient();

  const { mutateAsync: updateAffiliationStatus, ...mutateState } = useMutation(
    putRegistryHasAffiliationQuery()
  );

  useQueryAlerts(mutateState, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["getAffiliations", currentUser.registry_id as number],
      });
    },
  });

  const handleClick = async (status: AffiliationStatus) => {
    await updateAffiliationStatus({
      registryId: currentUser.registry_id,
      affiliationId: affiliation?.id as number,
      status,
    });
  };

  return (
    <ActionsPanel heading={t("heading")}>
      {mockedPendingAffiliations}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          disabled={mutateState.isPending}
          onClick={() => handleClick(AffiliationStatus.Approved)}
          startIcon={<VerifyIcon sx={{ color: "#fff" }} />}>
          {t("confirmAffiliationButton")}
        </Button>
        <Button
          disabled={mutateState.isPending}
          onClick={() => handleClick(AffiliationStatus.Rejected)}
          startIcon={<RejectIcon />}
          variant="outlined"
          sx={{ background: "#fff" }}>
          {t("declineAffiliationButton")}
        </Button>
      </Box>
    </ActionsPanel>
  );
}
