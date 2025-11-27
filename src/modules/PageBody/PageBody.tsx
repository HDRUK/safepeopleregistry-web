import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import SectionHeading from "../../components/SectionHeading";

export interface PageBodyProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export default function PageBody({
  children,
  heading,
  description,
  actions,
  ...restProps
}: PageBodyProps) {
  return (
    <>
      <SectionHeading
        heading={heading}
        description={description}
        actions={actions}
        sx={{ mb: 3 }}
      />
      <Box data-cy="page-body"
        {...restProps}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mb: 4,
          "> div:first-child": {
            pt: 0,
          },
          "> div:last-child": {
            pb: 0,
          },
          ...restProps.sx,
        }}>
        {children}
      </Box>
    </>
  );
}
