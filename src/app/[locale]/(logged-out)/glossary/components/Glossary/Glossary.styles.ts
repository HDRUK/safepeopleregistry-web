import theme from "@/theme";

export const letterNavigationContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1.25,
  padding: theme.spacing(1.5),
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette["neutral-50"].main,
};

export const termContainerStyles = {
  display: "flex",
  paddingBottom: theme.spacing(6),
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 6,
};

export const highlightedLetterStyles = {
  textDecoration: "none",
  color: theme.palette.primary.main,
};

export const termSectionStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 4,
};

export const termStyles = {
  flexGrow: 1,
  color: theme.palette.textPrimary.main,
};
