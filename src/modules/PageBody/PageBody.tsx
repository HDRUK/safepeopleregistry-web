import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { HeadingLevel } from "@/consts/header";
import SectionHeading from "../../components/SectionHeading";

export interface PageBodyProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  headingComponent?: HeadingLevel;
}

export default function PageBody({
  children,
  heading,
  description,
  actions,
  headingComponent,
  ...restProps
}: PageBodyProps) {
  return (
    <>
      <SectionHeading
        heading={heading}
        description={description}
        actions={actions}
        sx={{ mb: 3 }}
        headingComponent={headingComponent}
      />
      <Box
        data-cy="page-body"
        {...restProps}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mb: 4,
          "> div:first-of-type": {
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
