import { SxProps, Theme } from "@mui/material";

const contentSx: SxProps<Theme> = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  padding: 3,
  color: "secondary.contrastText",
  backgroundColor: "primary.main",
};

const titleSx: SxProps<Theme> = {
  fontSize: "48px",
  fontWeight: "700",
  mb: 1,
};

const subtitleSx: SxProps<Theme> = {
  fontWeight: "normal",
};

export { contentSx, titleSx, subtitleSx };
