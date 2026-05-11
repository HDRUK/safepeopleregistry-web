import { Grid, GridProps } from "@mui/material";

type PageColumnDetailsProps = GridProps;

export default function PageColumnDetails({
  children,
  ...restProps
}: PageColumnDetailsProps) {
  return (
    <Grid size={{ xs: 12, lg: 3 }} pb={3} {...restProps}>
      {children}
    </Grid>
  );
}
