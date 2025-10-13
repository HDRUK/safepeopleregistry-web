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
      variant="subtitle2"
      sx={{ color: "textSecondary.main", pt: 1, ...sx }}
      {...restProps}>
      {children}
    </Typography>
  );
}
