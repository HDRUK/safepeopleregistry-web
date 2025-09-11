import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export type FormSectionProps = BoxProps & {
  heading?: ReactNode;
  description?: ReactNode;
};

export default function FormSection({
  children,
  heading,
  description,
  ...restProps
}: FormSectionProps) {
  return (
    <Box
      component="fieldset"
      {...restProps}
      sx={{ p: 0, border: "none", ...restProps.sx }}>
      {(heading || description) && (
        <Box
          {...restProps}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 1 }}>
          {heading && <Typography variant="h3">{heading}</Typography>}
          {description && <Typography>{description}</Typography>}
        </Box>
      )}
      <Box>{children}</Box>
    </Box>
  );
}
