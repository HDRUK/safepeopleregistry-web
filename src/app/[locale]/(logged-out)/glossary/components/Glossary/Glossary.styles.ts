import theme from "@/theme";

export const LetterNavigationContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1.25,
  padding: "12px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  backgroundColor: theme.palette.lightGrey.main,
};

export const TermContainerStyles = {
  display: "flex",
  paddingBottom: "48px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 6,
};

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
