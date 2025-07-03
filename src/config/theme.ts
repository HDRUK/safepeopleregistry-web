import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const MODE = "light";

const {
  typography,
  palette: { augmentColor },
} = createTheme({});

const createColor = (mainColor: string) => {
  return augmentColor({ color: { main: mainColor } });
};

const headingStyles = {
  fontWeight: 600,
};

const bodyStyles = {
  letterSpacing: "-1%",
};

const PALETTE_THEME_PURPLE_BLUE = {
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    h1: {
      ...headingStyles,
      fontSize: "2.027rem",
    },
    h2: {
      ...headingStyles,
      fontSize: "1.802rem",
    },
    h3: {
      ...headingStyles,
      fontSize: "1.602rem",
    },
    h4: {
      ...headingStyles,
      fontSize: "1.424rem",
    },
    h5: {
      ...headingStyles,
      fontSize: "1.266rem",
    },
    h6: {
      ...headingStyles,
      fontSize: "1.125rem",
    },
    body: bodyStyles,
    small: {
      ...bodyStyles,
      ...typography.caption,
      fontSize: "0.889rem",
    },
    tiny: {
      ...bodyStyles,
      ...typography.caption,
      fontSize: "0.79rem",
    },
  },
  palette: {
    primary: createColor("#BE37A3"),
    secondary: createColor("#5769B2"),
    warning: createColor("#F0BB24"),
    warningDark: createColor("#866409"),
    info: createColor(blue["200"]),
    error: createColor("#DC3645"),
    success: createColor("#0C695D"),
    inactive: createColor(grey["300"]),
    white: "#fff",
    neutralPink: {
      light: "#F6DFF1",
      dark: "#F6DFF1",
      main: "#F6DFF1",
      contrastText: "#000",
    },
    neutralGrey: {
      light: "#F2F2F2",
      dark: "#F2F2F2",
      main: "#F2F2F2",
      contrastText: "#3C3C3B",
    },
    textPrimary: createColor("#1E1E1E"),
    textSecondary: createColor("#585754"),
    textPrimaryLink: createColor("#1E1E1E"),
    midGrey: createColor("#687078"),
    clear: createColor("#fff"),
    homepageKeyFeatures: {
      textSecondary: "#585754",
      contrastText: "#000",
    },
    homepageUsage: {
      light: "#5769B2",
      dark: "#47579A",
      contrastText: "#fff",
    },
    notificationActive: createColor("#DC3645"),
    notification: createColor("#5769B2"),
    muiBorder: grey["300"],
  },
};

export { MODE, PALETTE_THEME_PURPLE_BLUE };
