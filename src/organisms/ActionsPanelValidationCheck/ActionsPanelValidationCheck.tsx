import { Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ActionValidationLogComment from "../../components/ActionValidationLogComment";
import ViewMore from "../../components/ViewMore";
import { getValidationLogCommentsQuery } from "../../services/validation_logs";
import { ValidationLog } from "../../types/logs";
import ActionValidationMakeDecision from "../ActionValidationMakeDecision";

interface ActionsPanelValidationCheckProps {
  log: ValidationLog;
  onAction?: () => void;
  disabled?: boolean;
}

export default function ActionsPanelValidationCheck({
  log,
  onAction,
  disabled,
}: ActionsPanelValidationCheckProps) {
  const { data: comments, refetch: refetchComments } = useQuery({
    ...getValidationLogCommentsQuery(log.id),
    enabled: !!log.id,
    initialData: {
      data: log?.comments || [],
      message: "",
      status: 200,
    },
  });

  return (
    <Paper
      key={log.id}
      elevation={0}
      sx={{
        background: "#fff",
        p: 2,
        borderRadius: 2,
      }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {log.validation_check.description}
      </Typography>

      <ViewMore collapseNumRows={2}>
        {comments?.data
          ?.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .map(comment => (
            <div key={comment.id}>
              <ActionValidationLogComment comment={comment} />
            </div>
          ))}
      </ViewMore>
      <ActionValidationMakeDecision
        disabled={disabled}
        log={log}
        onAction={async () => {
          await refetchComments();
          onAction?.();
        }}
      />
    </Paper>
  );
}
