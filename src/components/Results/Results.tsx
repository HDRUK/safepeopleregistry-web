import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { QueryState } from "../../types/form";
import LoadingWrapper from "../LoadingWrapper";
import { Message } from "../Message";

interface ResultsProps extends BoxProps {
  noResultsMessage: ReactNode;
  errorMessage: ReactNode;
  total: number | undefined;
  queryState?: QueryState;
  pagination?: ReactNode;
}

export default function Results({
  queryState,
  noResultsMessage,
  errorMessage,
  children,
  total,
  pagination,
  ...restProps
}: ResultsProps) {
  return (
    <Box
      {...restProps}
      data-cy="results"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        ...restProps.sx,
      }}>
      {!queryState?.isLoading && !total && !queryState?.isError && (
        <Message severity="info">{noResultsMessage}</Message>
      )}
      {queryState?.isError && !queryState?.isLoading && (
        <Message severity="error">{errorMessage}</Message>
      )}
      {((queryState?.isLoading && !queryState?.isError) || !!total) && (
        <Box
          sx={{
            position: "relative",
            minHeight: "100px",
          }}>
          <LoadingWrapper
            variant="basic"
            loading={queryState?.isLoading && !queryState?.isError}>
            {!!total && <div>{children}</div>}
          </LoadingWrapper>
        </Box>
      )}
      {pagination && (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}>
          {pagination}
        </Box>
      )}
    </Box>
  );
}
