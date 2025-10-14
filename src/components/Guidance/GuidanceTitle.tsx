"use client";

import { ReactNode } from "react";
import Text, { TextProps } from "../Text";

export interface GuidanceTitleProps extends TextProps {
  infoTitleIcon?: ReactNode;
}

export default function GuidanceTitle({
  children,
  infoTitleIcon,
  ...restProps
}: GuidanceTitleProps) {
  return (
    <Text
      variant="h3"
      startIcon={infoTitleIcon}
      sx={{
        mb: 4,
      }}
      {...restProps}>
      {children}
    </Text>
  );
}
