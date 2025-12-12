"use client";

import { ReactNode } from "react";
import { HeadingLevel } from "@/consts/header";
import Text, { TextProps } from "../Text";

export interface GuidanceTitleProps extends TextProps {
  infoTitleIcon?: ReactNode;
  headingComponent?: HeadingLevel;
}

export default function GuidanceTitle({
  children,
  infoTitleIcon,
  headingComponent,
  ...restProps
}: GuidanceTitleProps) {
  return (
    <Text
      variant="h3"
      component={headingComponent ?? "h3"}
      startIcon={infoTitleIcon}
      sx={{
        mb: 4,
      }}
      {...restProps}>
      {children}
    </Text>
  );
}
