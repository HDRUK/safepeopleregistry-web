import { Box, styled } from "@mui/material";
import theme from "@/theme";
import { motion } from "motion/react";

const StyledOuterContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${theme.palette.homepageUsage.light};
  color: ${theme.palette.homepageUsage.contrastText};
`;

const StyledContainer = styled(Box)`
  border-radius: 24px;
  display: flex;
  width: 100%;
  background: ${theme.palette.homepageUsage.dark};
  color: ${theme.palette.homepageUsage.contrastText};
  padding-top: 24px;
  padding-bottom: 24px;
  justify-content: center;
`;

const StyledContent = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledFlex = styled("div")`
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: min(1300px, 100%);
`;

const StyledBox = styled(motion.div)`
  padding: 24px;
  display: flex;
  max-width: 430px;
`;

export {
  StyledOuterContent,
  StyledContent,
  StyledContainer,
  StyledFlex,
  StyledBox,
};
