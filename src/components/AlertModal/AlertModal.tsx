import { CheckOutlined, ErrorOutline, InfoOutlined } from "@mui/icons-material";
import {
  AlertProps,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { ReactNode } from "react";
import AlertModalIconOutline from "./AlertModalIconOutline";
import { capitaliseFirstLetter } from "@/utils/string";

export interface AlertModalProps extends DialogProps {
  open: boolean;
  onClose?: (payload?: unknown) => Promise<void>;
  text?: ReactNode;
  severity?: AlertProps["severity"];
  confirmButtonText?: string;
  confirmButtonColor?: ButtonProps["color"];
  cancelButtonText?: string;
  cancelButtonColor?: ButtonProps["color"];
  onConfirm?: (payload?: unknown) => Promise<void>;
  onCancel?: () => void;
  data?: unknown;
}

export default function AlertModal(props: AlertModalProps) {
  const theme = useTheme();

  console.log("****** AlertModal props", props);

  const {
    open,
    data,
    onClose,
    title,
    text,
    severity = "info",
    confirmButtonText = "OK",
    cancelButtonText,
    onCancel,
    onConfirm,
    confirmButtonColor,
    cancelButtonColor,
    ...restProps
  } = props;

  const iconProps = {
    sx: {
      width: 100,
      height: 100,
      color: `${severity}.main`,
    },
  };

  console.log("confirmButtonColor", confirmButtonColor);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...restProps}
      sx={{
        ".MuiPaper-root": {
          p: 2,
          width: "60vw",
          maxWidth: "600px",
        },
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 4,
          mb: 2,
        }}>
        {(severity === "info" || severity === "warning") && (
          <InfoOutlined {...iconProps} />
        )}
        {severity === "success" && (
          <AlertModalIconOutline severity="success">
            <CheckOutlined
              {...iconProps}
              sx={{ ...iconProps.sx, width: 55, height: 55 }}
            />
          </AlertModalIconOutline>
        )}
        {severity === "error" && <ErrorOutline {...iconProps} />}
      </Box>

      <DialogTitle
        sx={{ textAlign: "center", fontSize: theme.typography?.h1.fontSize }}>
        {title || capitaliseFirstLetter(severity)}
      </DialogTitle>
      {text && (
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center", fontSize: 16 }}>
            <Typography variant="subtitle1">{text}</Typography>
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          justifyContent: "center",
        }}>
        {cancelButtonText && (
          <Button
            onClick={() => {
              onCancel?.();
              onClose?.(data);
            }}
            color={cancelButtonColor || `primary`}
            variant="outlined">
            {cancelButtonText}
          </Button>
        )}
        <Button
          onClick={() => {
            onConfirm?.(data);
          }}
          variant="contained"
          autoFocus
          color={confirmButtonColor || `primary`}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
