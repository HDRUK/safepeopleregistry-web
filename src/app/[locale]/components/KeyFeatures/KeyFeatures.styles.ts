import { PALETTE_THEME_PURPLE_BLUE } from "@/config/theme";
import { SxProps, Theme } from "@mui/material";

export const contentSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  pt: 3,
  pb: 3,
  width: "auto",
  color: "homepageKeyFeatures.contrastText",
};

export const sectionFlexSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  gap: 3,
  flexWrap: "nowrap",
  mb: 2,

  "@media (max-width:900px)": {
    flexWrap: "wrap",
  },
};

export const articleContainerSx: SxProps<Theme> = {
  display: "flex",
  p: 3,
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 1.5,
  gridRow: "1 / span 1",
  gridColumn: "1 / span 1",
  justifySelf: "stretch",
  borderRadius: 1.5,
  backgroundColor: "common.white",
};

export const outerContentSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  pt: 3,
  pb: 3,
  background: `linear-gradient(175deg, ${PALETTE_THEME_PURPLE_BLUE.palette.neutralPink.light} 4.17%, ${PALETTE_THEME_PURPLE_BLUE.palette.white} 71.09%)`,
};
