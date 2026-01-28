import theme from "@/theme";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import React from "react";
import OverlayCenter from "../OverlayCenter";

export type LoadingWrapperProps = {
  loading: boolean;
  children?: React.ReactNode;
  variant?: "rich" | "basic";
  additionalProps?: BoxProps["sx"];
};

export default function LoadingWrapper({
  loading,
  children,
  variant = "rich",
  additionalProps = {},
}: LoadingWrapperProps) {
  if (variant === "basic") {
    additionalProps = {
      ...additionalProps,
      py: 5,
    };
  } else {
    additionalProps = {
      ...additionalProps,
      height: "100vh",
      background: theme.palette.white.default,
    };
  }

  if (loading) {
    return (
      <OverlayCenter variant="contained">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ...additionalProps,
          }}>
          {variant === "rich" && <h2>Loading...</h2>}
          <CircularProgress role="progressbar" title="Loading data" />
        </Box>
      </OverlayCenter>
    );
  }

  return children;
}
