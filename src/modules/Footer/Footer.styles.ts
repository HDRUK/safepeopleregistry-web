import { Box, css, styled } from "@mui/material";

const StyledFooter = styled(Box)(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(6)};
    padding: ${theme.spacing(3)};
    width: 100%;
    align-ttems: stretch;
    flex-wrap: wrap;
  `
);

const StyledBox = styled(Box)(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(3)};
    flex-wrap: wrap;
  `
);

const StyledFooterImageWrapper = styled(Box)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(3)};
    justify-content: space-between;
  `
);

export { StyledFooter, StyledBox, StyledFooterImageWrapper };
