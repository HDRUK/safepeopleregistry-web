import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

export interface PageHeadingProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
}

export default function PageHeading({
  heading,
  description,
  sx,
  ...restProps
}: PageHeadingProps) {
  const titleProps: Partial<TypographyProps> = {
    sx: {
      width: "100%",
      border: "none",
      borderRadius: "10px",
      px: 2,
      py: 1,
      backgroundColor: "secondary.main",
      color: "secondary.contrastText",
    },
  };

  return (
    <Box
      {...restProps}
      sx={{ display: "flex", flexDirection: "column", gap: 3, ...sx }}>
      {heading && (
        <Typography variant="h1" {...titleProps}>
          {heading}
        </Typography>
      )}
      {description && <Typography> {description}</Typography>}
    </Box>
  );
}
