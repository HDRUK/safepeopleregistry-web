import { Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

export type FormControlDescriptionProps = PropsWithChildren & TypographyProps;

export default function FormControlDescription({
  children,
  sx,
  ...restProps
}: PropsWithChildren) {
  return (
    <Typography
      variant="tiny"
      component="p"
      sx={{ color: "textSecondary.main", pt: 0.5, ...sx }}
      {...restProps}>
      {children}
    </Typography>
  );
}
