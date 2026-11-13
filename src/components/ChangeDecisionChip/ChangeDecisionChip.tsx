import { Box, Button, Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import { VerifyIcon, RejectIcon } from "../../consts/icons";

interface ChangeDecisionChipProps {
  completed: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const NAMESPACE_TRANSLATION_COMPLETED_CHIP = "ChangeDecisionChip";

const ChangeDecisionChip = ({
  completed,
  onClick,
  disabled = false,
}: ChangeDecisionChipProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_COMPLETED_CHIP);
  return (
    <Box
      sx={{ mt: 4, display: "flex", gap: 1, justifyContent: "space-between" }}>
      <Chip
        icon={
          completed ? (
            <VerifyIcon sx={{ color: "white" }} />
          ) : (
            <RejectIcon sx={{ color: "white" }} />
          )
        }
        label={completed ? t("passed") : t("failed")}
        color={completed ? "success" : "error"}
      />
      {!disabled && (
        <Button
          data-testid="validation-log-change-decision"
          variant="outlined"
          onClick={onClick}>
          {t("changeDecision")}
        </Button>
      )}
    </Box>
  );
};

export default ChangeDecisionChip;
