import { css, styled } from "@mui/material";

export const StyledGuidance = styled("div")<{ positionVertical: boolean }>(
  ({ positionVertical }) => css`
    display: flex;
    flex-direction: ${positionVertical ? "column" : "row"};
    flex-grow: 1;
    position: relative;
  `
);

export const StyledInfo = styled("div")<{
  positionVertical: boolean;
  infoWidth: number | string;
}>(
  ({ theme, positionVertical, infoWidth }) => css`
    padding: ${theme.spacing(4)};
    color: ${theme.palette.neutralPink.contrastText};
    background-color: ${theme.palette.neutralPink.main};
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    ${positionVertical
      ? `
        width: 100%;
        max-height: 300px;`
      : `


        width: ${infoWidth || "auto"};
      `}

    * {
      color: ${theme.palette.neutralPink.contrastText};
    }
  `
);
