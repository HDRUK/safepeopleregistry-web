"use client";

import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

export interface ActionsPanelProps extends BoxProps {
  children: ReactNode;
  description?: ReactNode;
  heading?: ReactNode;
  variant?: "plain" | "decorated";
  panelSx?: BoxProps["sx"];
}

export default function ActionsPanel({
  children,
  description,
  heading,
  variant = "decorated",
  panelSx,
  ...restProps
}: ActionsPanelProps) {
  const theme = useTheme();

  const defaultPanelSx =
    variant === "decorated"
      ? {
          backgroundColor: "neutralPink.main",
          p: 3,
          gap: 1,
        }
      : {};

  const itemSx =
    variant === "decorated"
      ? { gap: 1 }
      : {
          "> .MuiPaper-root": {
            borderBottom: "1px solid #aaa",
            borderBottomColor: theme.palette.divider,
            borderRadius: 0,
          },
        };

  return (
    <Box
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        ...defaultPanelSx,
        ...panelSx,
        ...restProps.sx,
      }}>
      {heading && (
        <Typography variant="h4" sx={{ mb: 2 }}>
          {heading}
        </Typography>
      )}
      {description && <Box sx={{ mb: 2 }}>{description}</Box>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ...itemSx,
        }}>
        {children}
      </Box>
    </Box>
  );
}
