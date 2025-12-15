import { HeadingLevel } from "@/consts/header";
import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface SectionHeadingProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingComponent?: HeadingLevel;
}

export default function SectionHeading({
  heading,
  description,
  actions,
  sx,
  headingComponent,
  ...restProps
}: SectionHeadingProps) {
  return (
    (heading || description) && (
      <Box
        sx={{ gap: 1, display: "flex", flexDirection: "column", ...sx }}
        {...restProps}>
        {heading && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h2" component={headingComponent ?? "h2"}>
              {heading}
            </Typography>
            <div>{actions}</div>
          </Box>
        )}
        {description && <Typography variant="body1">{description}</Typography>}
      </Box>
    )
  );
}
