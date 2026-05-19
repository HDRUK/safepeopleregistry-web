import theme from "@/theme";
import { styled, Link, Typography } from "@mui/material";

const GlossaryContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.white,
}));

const LetterNavigationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing("10px"),
  padding: "12px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  backgroundColor: theme.palette.lightGrey.main,
}));

const LetterNavigationItem = styled("div")(({ theme }) => ({
  color: theme.palette.textSecondary,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h2.fontSize,
  fontStyle: theme.typography.h2.fontStyle,
  fontWeight: theme.typography.h2.fontWeight,
  lineHeight: theme.typography.h2.lineHeight,
}));

const HighlightedLetter = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const TermSection = styled("div")(() => ({
  display: "flex",
  paddingBottom: "48px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing("48px"),
}));

const TermContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing("12px"),
}));

const LetterHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.textPrimary.main,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h1.fontSize,
  fontStyle: theme.typography.h1.fontStyle,
  fontWeight: theme.typography.h1.fontWeight,
  lineHeight: theme.typography.h1.lineHeight,
}));

const Term = styled(Typography)(({ theme }) => ({
  flex: "1 0 0",
  color: theme.palette.textPrimary.main,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h6.fontSize,
  fontStyle: theme.typography.h6.fontStyle,
  fontWeight: theme.typography.h6.fontWeight,
  lineHeight: theme.typography.h6.lineHeight,
}));

const Definition = styled(Typography)(({ theme }) => ({
  width: "900px",
  color: theme.palette.darkGrey.main,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.paragraph.fontSize,
  fontStyle: theme.typography.paragraph.fontStyle,
  fontWeight: theme.typography.paragraph.fontWeight,
  lineHeight: theme.typography.paragraph.lineHeight,
}));

export {
  GlossaryContainer,
  LetterNavigationContainer,
  LetterNavigationItem,
  HighlightedLetter,
  TermSection,
  TermContainer,
  LetterHeading,
  Term,
  Definition,
};
