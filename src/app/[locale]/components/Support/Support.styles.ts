import { SxProps, Theme } from "@mui/material";

const styledContent: SxProps<Theme> = {
  backgroundColor: "common.white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 3,
  width: "auto",
  color: "common.black",
};

const styledGrid: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "repeat(3, 1fr)",
  },
  gap: 3,
};

const styledContainer: SxProps<Theme> = {
  backgroundColor: "common.white",
  display: "flex",
  flexDirection: "column",
  p: 1.5,
};

export { styledContent, styledGrid, styledContainer };
