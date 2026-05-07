import { styled } from "@mui/material";

const StyledContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: "auto",
  color: theme.palette.homepageKeyFeatures.contrastText,
}));

const StyledSectionFlex = styled("section")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(3),
  flexWrap: "nowrap",
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

const StyledArticleContainer = styled("article")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(3),
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(1.5),
  gridRow: "1 / span 1",
  gridColumn: "1 / span 1",
  justifySelf: "stretch",
  borderRadius: theme.spacing(1.5),
  background: theme.palette.common.white,
}));

export { StyledContent, StyledArticleContainer, StyledSectionFlex };
