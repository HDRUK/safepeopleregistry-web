import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ActionValidationCommentForm, {
  ActionValidationCommentFormData,
} from "../../components/ActionValidationCommentForm";
import ChangeDecisionChip from "../../components/ChangeDecisionChip";
import { RejectIcon, VerifyIcon } from "../../consts/icons";
import {
  postValidationLogCommentQuery,
  putValidationLogQuery,
} from "../../services/validation_logs";
import { ValidationLogAction } from "../../services/validation_logs/types";
import { ValidationLog } from "../../types/logs";

interface ActionValidationMakeDecisionProps {
  log: ValidationLog;
  onAction?: () => Promise<void>;
}

const NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION =
  "ActionValidationMakeDecision";

export default function ActionValidationMakeDecision({
  log,
  onAction,
}: ActionValidationMakeDecisionProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION);

  const [currentLog, setCurrentLog] = useState<ValidationLog>(log);

  const [showDecisionChip, setShowDecisionChip] = useState(
    !!currentLog.completed_at
  );

  const user = useStore(store => store.getUser());
  const { mutateAsync: createComment, isPending: isPendingPostComment } =
    useMutation(postValidationLogCommentQuery());

  const { mutateAsync: updateLog, isPending: isPendingUpdateLog } = useMutation(
    putValidationLogQuery(currentLog.id)
  );

  const [selectedAction, setSelectedAction] =
    useState<ValidationLogAction | null>(null);

  const onSubmit = async (data: ActionValidationCommentFormData) => {
    if (!selectedAction) return;
    const { comment } = data;
    const res = await updateLog(selectedAction);
    setCurrentLog(res.data);

    if (comment) {
      await createComment({
        user_id: user?.id as number,
        validation_log_id: res.data.id,
        comment,
      });
    }

    await onAction?.();
    setSelectedAction(null);
    setShowDecisionChip(!!res.data.completed_at);
  };

  if (selectedAction) {
    return (
      <ActionValidationCommentForm
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateLog || isPendingPostComment}
      />
    );
  }

  if (showDecisionChip) {
    return (
      <ChangeDecisionChip
        completed={currentLog.manually_confirmed === 1}
        onClick={() => setShowDecisionChip(false)}
      />
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
      <Button
        data-testid="validation-log-initial-pass"
        onClick={() => setSelectedAction(ValidationLogAction.PASS)}
        variant="outlined"
        startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
        {t("pass")}
      </Button>
      <Button
        data-testid="validation-log-initial-fail"
        onClick={() => setSelectedAction(ValidationLogAction.FAIL)}
        variant="outlined"
        startIcon={<RejectIcon />}>
        {t("fail")}
      </Button>
      <ActionMenu
        trigger={
          <Button
            data-testid="validation-log-initial-comment"
            variant="outlined">
            &#8230;
          </Button>
        }>
        {({ handleClose }) => (
          <ActionMenuItem
            data-testid="validation-log-add-more-info"
            icon={<InfoOutlined color="primary" />}
            onClick={() => {
              setSelectedAction(ValidationLogAction.MORE);
              handleClose();
            }}>
            <Typography color="primary"> {t("addMoreInformation")} </Typography>
          </ActionMenuItem>
        )}
      </ActionMenu>
    </Box>
  );
}
