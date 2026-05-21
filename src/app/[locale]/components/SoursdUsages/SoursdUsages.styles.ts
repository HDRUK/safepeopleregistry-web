import { Box, styled } from "@mui/material";
import { motion } from "motion/react";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: theme.spacing(3),
  borderRadius: theme.spacing(3),
}));

const StyledContent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "100%",
}));

const StyledFlex = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexWrap: "wrap",
  columnGap: theme.spacing(6),
  rowGap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const StyledBox = styled(motion.div)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export { StyledContent, StyledContainer, StyledFlex, StyledBox };
