"use client";

import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ULBaseProps extends BoxProps {
  children: ReactNode;
  separator?: string;
  variant?: "vertical" | "horizontal";
}

export default function UL({
  separator = "|",
  variant = "horizontal",
  children,
  ...restProps
}: ULBaseProps) {
  return (
    <Box
      component="ul"
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: variant === "vertical" ? "column" : "row",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0,
        m: 0,
        mb: 1,
        gap: 1,
        ...(variant === "horizontal" && {
          alignItems: "center",
          gap: 0,
          "> li": {
            "&:after": {
              content: `"${separator}"`,
              padding: "0 4px",
            },
            "&:first-of-type": {
              pl: 0,
            },
            "&:last-child:after": {
              content: '""',
            },
          },
        }),
        ...restProps?.sx,
      }}>
      {children}
    </Box>
  );
}
