"use client";

import * as React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const clientTheme = createTheme(theme, {
  components: {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          warning: <ErrorOutlineIcon />,
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
