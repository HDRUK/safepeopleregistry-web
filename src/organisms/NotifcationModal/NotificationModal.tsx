import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Modal,
  ModalProps,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Paper,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { useTranslations } from "next-intl";
import { Notification } from "../../types/notifications";
import { formatDBDateTime } from "../../utils/date";
import { toTitleCase } from "../../utils/string";
import { formatNotificationType } from "../../utils/notifications";
import usePutReadRequest from "../NotificationsMenu/hooks/usePutReadRequest";

const NAMESPACE_TRANSLATIONS = "NotificationsModal";

export interface FormModalProps extends Omit<ModalProps, "children"> {
  notification: Notification;
  onClose: (event: React.SyntheticEvent, reason: string) => void;
  handleMarkAsUnread: () => void;
  isLoading?: boolean;
  onBack?: () => void;
}

export default function NotificationModal({
  notification,
  isLoading,
  onClose,
  handleMarkAsUnread,
  onBack,
  sx,
  ...restProps
}: FormModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const theme = useTheme();
  const mobileMediaQuery = theme.breakpoints.down("sm");

  const { mutateAsync: mutateReadRequest } = usePutReadRequest();

  const approveOrDenyRequest = async (requestId: number, status: number) => {
    if (!requestId || !status) return;

    try {
      await mutateReadRequest({
        requestId,
        status,
      });
    } catch (error) {
      console.error("Error approving/denying request:", error);
    }
  };

  const handleApproveOrDeny = (requestId: number, status: number) => {
    approveOrDenyRequest(requestId, status);
  };

  const { details } = notification.data;
  const isDetailsObject = typeof details === "object";

  const hasOldNewStructure =
    isDetailsObject &&
    Object.values(details).some(
      val =>
        typeof val === "object" && val !== null && "old" in val && "new" in val
    );

  return (
    <Modal
      data-testid="notification-modal"
      onClose={onClose}
      sx={{ p: 1 }}
      {...restProps}>
      <Card
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          overflowY: "scroll",
          maxHeight: `calc(100vh - ${theme.spacing(4)})`,
          minWidth: "600px",
          [mobileMediaQuery]: {
            width: `calc(100% - ${theme.spacing(2)})`,
            minWidth: "auto",
          },
          paddingTop: 4,
          ...sx,
        }}>
        <CardHeader
          data-testid="notification-modal-header"
          title={notification?.data.message}
          subheader={
            <span>
              {formatNotificationType(notification.type)}
              {" - "}
              {formatDBDateTime(notification.data.time)}
            </span>
          }
        />
        <CardContent
          sx={{
            mt: 0,
            pt: 0,
            px: 4,
            [mobileMediaQuery]: {
              px: 2,
            },
          }}>
          {onBack && (
            <Box sx={{ position: "absolute", top: 5, left: 5 }}>
              <span>
                <IconButton onClick={onBack}>
                  <ChevronLeftIcon />
                </IconButton>
              </span>
            </Box>
          )}
          <Box sx={{ position: "absolute", top: 5, right: 5 }}>
            <span>
              <Tooltip title={t("toolTipMarkAsUnread")}>
                <IconButton
                  onClick={handleMarkAsUnread}
                  data-testid="mark-notification-as-unread-button">
                  <MarkEmailUnreadIcon />
                </IconButton>
              </Tooltip>
              <IconButton onClick={e => onClose(e, "escapeKeyDown")}>
                <CloseIcon />
              </IconButton>
            </span>
          </Box>

          {isLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CircularProgress />
            </Box>
          )}

          {Array.isArray(notification.data.actions) && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}>
              {notification.data.actions.map(action => (
                <ListItem>
                  <ListItemIcon>
                    {action.completed_at ? (
                      <CheckIcon color="success" />
                    ) : (
                      <PendingIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={toTitleCase(action.action)}
                    secondary={
                      action.completed_at &&
                      formatDBDateTime(action.completed_at)
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          {isDetailsObject ? (
            <TableContainer
              component={Paper}
              sx={{ marginTop: 0, width: "100%" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("colField")}</TableCell>
                    {hasOldNewStructure ? (
                      <>
                        <TableCell align="right">{t("colOldValue")}</TableCell>
                        <TableCell align="right">{t("colNewValue")}</TableCell>
                      </>
                    ) : (
                      <TableCell align="right">{t("colValue")}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(details).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      {typeof value === "object" &&
                      value !== null &&
                      "old" in value &&
                      "new" in value ? (
                        <>
                          <TableCell align="right">
                            {value.old ?? "—"}
                          </TableCell>
                          <TableCell align="right">
                            {value.new ?? "—"}
                          </TableCell>
                        </>
                      ) : (
                        <TableCell align="right" colSpan={2}>
                          {value ?? "—"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <Box
                sx={{ mb: 1 }}
                dangerouslySetInnerHTML={{
                  __html: notification.data.details || "No further details.",
                }}
              />
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}>
                {Object.entries(notification.data.buttonUrls ?? {}).map(
                  ([name, id]) => (
                    <Button
                      key={id}
                      variant="contained"
                      color={name === "Approve" ? "primary" : "secondary"}
                      onClick={() =>
                        handleApproveOrDeny(id, name === "Approve" ? 1 : 2)
                      }>
                      {name}
                    </Button>
                  )
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
