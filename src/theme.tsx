"use client";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AugmentedColorPaletteOptions, Theme } from "@mui/material";
import { TableCellProps } from "@mui/material/TableCell";
import grey from "@mui/material/colors/grey";
import { createTheme, darken } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";
import { Roboto } from "next/font/google";
import { PALETTE_THEME_PURPLE_BLUE } from "./config/theme";
import { colorToRgba, getAugmentedColor, isLightMode } from "./utils/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const breakpoints = createBreakpoints({});

const paletteTheme = createTheme(PALETTE_THEME_PURPLE_BLUE);

const getHoverColor = (theme: Theme) => {
  return isLightMode(theme) ? "rgba(0,0,0,0.17)" : "rgba(255,255,255,0.17)";
};

const createBoxStyles = <T extends { color?: AugmentedColorPaletteOptions }>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = getAugmentedColor(paletteTheme, ownerState.color);

    if (typeof color === "object") {
      return {
        color: color.contrastText,
        backgroundColor: color.main,
      };
    }
  }

  return null;
};

const createTabStyles = (theme: Theme) => {
  return {
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "4px 8px",
    minHeight: "36px",
    flexGrow: 1,
    backgroundColor: grey["100"],
    boxShadow: `inset 0 -4px 4px -2px rgba(0, 0, 0, 0.1)`,
    "&:hover": {
      backgroundColor: getHoverColor(theme),
    },

    "&.Mui-selected": {
      backgroundColor: "white",
      border: 0,
      borderTop: `4px solid ${theme.palette.primary.main} `,
      boxShadow: "none",
    },
  };
};
const createTabsStyles = <T extends { color?: AugmentedColorPaletteOptions }>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = getAugmentedColor(paletteTheme, ownerState.color);

    return {
      color: color.contrastText,
      minHeight: "36px",
      backgroudColor: "inherit",
      marginTop: 2,
      ".MuiTabs-indicator": {
        backgroundColor: paletteTheme.palette.primary.main,
        top: 0,
        bottom: "auto",
      },
    };
  }

  return null;
};

const createStepperStyles = <
  T extends { color?: AugmentedColorPaletteOptions },
>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = getAugmentedColor(paletteTheme, ownerState.color);
    const inactiveColor = getAugmentedColor(paletteTheme, "inactive");

    return {
      ".MuiStepLabel-root .MuiStepIcon-root": {
        color: inactiveColor.contrastText,
        backgroundColor: inactiveColor.main,
        borderRadius: "50%",
      },
      ".MuiStepLabel-root .MuiStepIcon-root.Mui-active": {
        color,
        borderRadius: "50%",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      },
      ".MuiStepLabel-root .MuiStepIcon-root.Mui-completed": {
        color,
        borderRadius: "50%",
        backgroundColor: color.contrastText,
      },
      ".MuiStepLabel-root .MuiStepIcon-root .MuiStepIcon-text": {
        fill: "#fff",
      },
    };
  }

  return null;
};

const createIconButtonStyles = <
  T extends {
    variant?: string;
    color?: AugmentedColorPaletteOptions | "inherit";
  },
>(
  ownerState: T
) => {
  const disabledColor = getAugmentedColor(paletteTheme, "inactive");

  if (
    ownerState.variant === "contained" &&
    ownerState.color &&
    ownerState.color !== "inherit"
  ) {
    const color = getAugmentedColor(paletteTheme, ownerState.color);

    return {
      color: color.contrastText,
      backgroundColor: "pink",
      "&:hover": {
        backgroundColor: darken(color.main, 0.125),
      },
      "&:disabled > .MuiSvgIcon-root": {
        color: disabledColor.dark,
      },
    };
  }
  return {
    "&:disabled > .MuiSvgIcon-root": {
      color: disabledColor.main,
    },
  };
};

const createMuiModalStyles = <T extends { outline?: boolean }>(
  ownerState: T
) => {
  if (!ownerState.outline) {
    return `
      outline: none;

      &:focus,
      > div {
        outline: none;
      };
    `;
  }

  return null;
};

const createMuiTableStyles = (ownerState: TableCellProps) => {
  return {
    ...(ownerState?.variant === "head" && {
      fontWeight: "bold",
      borderTop: "1px solid rgba(224, 224, 224, 1)",
    }),
    ...theme.typography.small,
    lineHeight: "140%",
  };
};

const createMuiChipStyles = () => {
  return {
    paddingLeft: "4px",
    paddingRight: "4px",
    background: "midGrey.main",
    "& > .MuiChip-label": {
      color: "midGrey",
    },
  };
};

const createSwitchStyles = () => {
  return {
    ".MuiSwitch-switchBase.Mui-checked": {
      color: "#fff",
    },
    ".MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
      opacity: "initial",
    },
  };
};

const createDividerStyles = <
  T extends {
    gradient?: boolean;
    orientation?: "horizontal" | "vertical";
    color?: AugmentedColorPaletteOptions | string;
  },
>(
  ownerState: T
) => {
  if (ownerState.color) {
    const color = getAugmentedColor(paletteTheme, ownerState.color);

    const rgbColor = colorToRgba(color.main, 0.8);
    const rgbColorStop = colorToRgba(color.main, 0);
    const initialStyles = {
      border: "none",
      height: "1px",
      width: "auto",
      backgroundColor: rgbColor,
    };

    if (ownerState.orientation === "vertical") {
      initialStyles.height = "auto";
      initialStyles.width = "1px";
    }

    if (ownerState.gradient) {
      let gradientDegs = "0deg";

      if (ownerState.orientation === "horizontal") {
        gradientDegs = "90deg";
      }

      return {
        ...initialStyles,
        background: `linear-gradient(${gradientDegs}, ${rgbColorStop} 0%, ${rgbColor} 35%, ${rgbColor} 65%, ${rgbColorStop} 100%)`,
      };
    }

    return initialStyles;
  }

  return null;
};

const theme = createTheme(
  {
    typography: {
      fontFamily: roboto.style.fontFamily,
      fontSize: 14,
    },
    spacing: 4,
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: ({ ownerState }) => createMuiTableStyles(ownerState),
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: paletteTheme.palette.neutralGrey.main,
            ".MuiTableCell-root": {
              color: paletteTheme.palette.neutralGrey.contrastText,
              fontWeight: "600",
              py: 1,
              width: "auto",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            ".MuiTableCell-root": {
              borderBottom: "neutralGrey.main",
              py: 1,
            },
          },
        },
      },
      MuiModal: {
        defaultProps: {
          outline: false,
        },
        styleOverrides: {
          root: ({ ownerState }) => createMuiModalStyles(ownerState),
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
          html {
            font-size: 16px;
          }
          body,
          .swal2-title {
            line-height: 140%;
          }
      `,
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            boxShadow: "none",
            textTransform: "none",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            lineHeight: "140%",
          },
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
        },
      },
      MuiAlert: {
        defaultProps: {
          iconMapping: {
            warning: <ErrorOutlineIcon />,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: paletteTheme.palette.primary.dark,
            color: "#fff",
            [breakpoints.up("sm")]: {
              minHeight: "52px",
            },
          },
        },
      },
      MuiInputBase: {
        defaultProps: {
          size: "small",
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            ...paletteTheme.typography.small,
            fontWeight: "500",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ ownerState }) => createBoxStyles(ownerState),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: createMuiChipStyles,
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: () => createSwitchStyles(),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ ownerState }) => createBoxStyles(ownerState),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => createIconButtonStyles(ownerState),
        },
      },
      MuiStepper: {
        defaultProps: {
          color: "primary",
        },
        styleOverrides: {
          root: ({ ownerState }) => createStepperStyles(ownerState),
        },
      },
      MuiDivider: {
        defaultProps: {
          color: "default",
          orientation: "horizontal",
        },
        styleOverrides: {
          root: ({ ownerState }) => createDividerStyles(ownerState),
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            a: {
              color: "#fff",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => createTabStyles(theme),
        },
      },
      MuiTabs: {
        defaultProps: {
          color: grey["300"],
        },
        styleOverrides: {
          root: ({ ownerState }) => createTabsStyles(ownerState),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
            },
          },
        },
      },
      MuiPopover: {
        defaultProps: {
          slotProps: {
            paper: {
              sx: { p: 1, maxWidth: "500px" },
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: "500",
            color: paletteTheme.palette.textPrimary.main,
          },
        },
      },
    },
  },
  paletteTheme
);

export default theme;
