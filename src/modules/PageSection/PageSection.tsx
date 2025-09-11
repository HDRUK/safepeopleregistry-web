"use client";

import SectionHeading from "@/components/SectionHeading";
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

type PageSectionProps = BoxProps & {
  heading?: ReactNode;
  description?: ReactNode;
};

export default function PageSection({
  children,
  heading,
  description,
  sx,
  ...restProps
}: PageSectionProps) {
  return (
    <Box {...restProps} sx={{ position: "relative", zIndex: 1, pr: 2, ...sx }}>
      <SectionHeading heading={heading} description={description} mb={3} />
      {children}
    </Box>
  );
}
