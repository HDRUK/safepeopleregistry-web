import { Box, BoxProps } from "@mui/material";
import PageHeading, { PageHeadingProps } from "../../components/PageHeading";

type PageBodyContainerProps = BoxProps & PageHeadingProps;

export default function PageBodyContainer({
  children,
  heading,
  description,
  ...restProps
}: PageBodyContainerProps) {
  return (
    <Box {...restProps}>
      {heading && (
        <PageHeading
          heading={heading}
          description={description}
          sx={{ mb: 3 }}
        />
      )}
      {children}
    </Box>
  );
}
