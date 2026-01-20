import { styled } from "@mui/material";
import theme from "@/theme";

const StyledContent = styled("div")`
  background: linear-gradient(180deg, #f6ebf8, #ffffff 100%);
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: auto;
  color: ${theme.palette.homepageKeyFeatures.contrastText};
`;

const Flex = `
  justify-content: space-around;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
  padding: 0px;
  margin-bottom: 12px;
  margin-top: 24px;
`;

const StyledSectionFlex = styled("section")`
  ${Flex}
`;
const StyledFlex = styled("div")`
  ${Flex}
`;
const Container = `
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-bottom: 12px;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 5%);
  min-height: 240px;
  max-width: 400px;
`;
const StyledArticleContainer = styled("article")`
  ${Container}
`;

const StyledContainer = styled("div")`
  ${Container}
`;

export {
  StyledContent,
  StyledFlex,
  StyledContainer,
  StyledArticleContainer,
  StyledSectionFlex,
};
