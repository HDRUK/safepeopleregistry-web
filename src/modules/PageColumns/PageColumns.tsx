import { Grid, GridProps } from "@mui/material";

type PageColumnsProps = GridProps;

export default function PageColumns({
  children,
  sx,
  ...restProps
}: PageColumnsProps) {
  return (
    <Grid
      container
      columnSpacing={3}
      rowSpacing={3}
      sx={{ mb: 2, ...sx }}
      {...restProps}>
      {children}
    </Grid>
  );
}
