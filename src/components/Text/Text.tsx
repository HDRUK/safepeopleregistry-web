"use client";

import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
import Copyable from "../Copyable";

export interface TextProps extends TypographyProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconSize?: string;
  copyable?: boolean;
}

export default function Text({
  children,
  startIcon,
  endIcon,
  sx,
  variant,
  iconSize = "1.1em",
  copyable,
  ...restProps
}: TextProps) {
  return (
    <Typography
      {...restProps}
      variant={variant}
      sx={{
        display: variant === "caption" ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 0.5,
        ["> svg, img"]: {
          fontSize: iconSize,
          height: iconSize,
          width: iconSize,
        },
        ...sx,
      }}>
      {startIcon}
      {copyable ? <Copyable>{children}</Copyable> : children}
      {endIcon}
    </Typography>
  );
}
