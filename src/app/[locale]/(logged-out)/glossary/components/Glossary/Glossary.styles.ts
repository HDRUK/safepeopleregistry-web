import theme from "@/theme";
import { styled } from "@mui/material";

const LetterNavigationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing("10px"),
  padding: "12px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  backgroundColor: theme.palette.lightGrey.main,
}));

const TermContainer = styled("div")(({ theme }) => ({
  display: "flex",
  paddingBottom: "48px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing("48px"),
}));

export const HighlightedLetterStyles = {
  textDecoration: "none",
  color: theme.palette.primary.main,
};
export const TermSectionStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 4,
};

export const TermStyles = {
  flex: "1 0 0",
  color: theme.palette.textPrimary.main,
};

export const DefinitionStyles = {
  fontSize: theme.typography.paragraph.fontSize,
  fontWeight: theme.typography.paragraph.fontWeight,
  lineHeight: theme.typography.paragraph.lineHeight,
};

export { LetterNavigationContainer, TermContainer };
