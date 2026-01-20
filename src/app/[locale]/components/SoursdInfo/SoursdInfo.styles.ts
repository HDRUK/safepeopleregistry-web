import { styled } from "@mui/material";
import theme from "@/theme";

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 60px;
  padding-bottom: 48px;
  color: ${theme.palette.secondary.contrastText};
  background-color: ${theme.palette.secondary.main};
`;

export { StyledContent };
