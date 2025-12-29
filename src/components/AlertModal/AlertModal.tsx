import { CheckOutlined, ErrorOutline, InfoOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import AlertModalIconOutline from "./AlertModalIconOutline";
import { ReactNode } from "react";

export interface AlertModalProps extends DialogProps {
  open: boolean;
  onClose?: (payload?: unknown) => void;
  text?: ReactNode;
  severity?: "info" | "warning" | "error" | "success";
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: (payload?: unknown) => void;
  onCancel?: () => void;
  data: unknown;
}

export default function AlertModal(props: AlertModalProps) {
  const theme = useTheme();

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
    ...restProps
  } = props;

  const iconProps = {
    sx: {
      width: 100,
      height: 100,
      color: `${severity}.main`,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...restProps}
      sx={{
        ".MuiPaper-root": {
          p: 2,
        },
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 1,
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
      {title && (
        <DialogTitle
          sx={{ textAlign: "center", fontSize: theme.typography?.h1.fontSize }}>
          {title}
        </DialogTitle>
      )}
      {text && (
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        {cancelButtonText && (
          <Button
            onClick={() => {
              onCancel?.();
              onClose?.(data);
            }}
            variant="outlined">
            {cancelButtonText}
          </Button>
        )}
        <Button
          onClick={() => {
            onConfirm?.(data);
          }}
          variant="contained"
          autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
