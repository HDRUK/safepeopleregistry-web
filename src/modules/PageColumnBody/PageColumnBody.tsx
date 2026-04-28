import { Grid, GridProps } from "@mui/material";

type PageColumnBodyProps = GridProps;

export default function PageColumnBody({
  children,
  ...restProps
}: PageColumnBodyProps) {
  return (
    <Grid size={{ xs: 12, lg: 9 }} pb={3} {...restProps}>
      {children}
    </Grid>
  );
}
