"use client"

import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

export interface OverlayCenterProps extends BoxProps {
  variant?: "screen" | "contained";
}

export default function OverlayCenter({
  variant = "screen",
  children,
  sx,
  ...restProps
}: OverlayCenterProps) {
  return (
    <Box
      {...restProps}
      sx={{
        position: variant === "screen" ? "fixed" : "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 3,
        ...sx,
      }}>
      {children}
    </Box>
  );
}
