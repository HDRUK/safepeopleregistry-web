import { styled } from "@mui/material";

const StyledContent = styled("div")`
  background: #ffffff;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: auto;
  color: black;
`;

const StyledFlex = styled("div")`
  justify-content: space-around;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
`;

const StyledContainer = styled("div")`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export { StyledContent, StyledFlex, StyledContainer };
