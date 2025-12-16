"use client";

import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import { ReactNode, useState } from "react";

export interface BannerLists {
  christmasMessage: boolean;
}

export interface MessageProps extends AlertProps {
  children: ReactNode;
  position?: "body" | "notification";
  isDismissable?: boolean;
  snackbarProps?: SnackbarProps;
}

export default function Message({
  children,
  position = "body",
  isDismissable,
  snackbarProps,
  ...restProps
}: MessageProps) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  let dismissableProps = {};

  if (isDismissable) {
    dismissableProps = {
      onClose: handleClose,
    };
  }

  if (position === "notification") {
    return (
      <Snackbar open={open} {...snackbarProps}>
        <Alert {...dismissableProps} {...restProps}>
          {children}
        </Alert>
      </Snackbar>
    );
  }

  return (
    open && (
      <Alert {...dismissableProps} {...restProps}>
        {children}
      </Alert>
    )
  );
}
