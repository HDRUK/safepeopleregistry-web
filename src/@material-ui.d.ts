import "@mui/material/styles";

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

interface ColorOverrides {
  inactive: true;
  neutralPink: true;
  neutralGrey: true;
  textSecondary: true;
  textPrimary: true;
  lightGrey: true;
  midGrey: true;
  darkGrey: true;
  clear: true;
  homepageKeyFeatures: true;
  homepageUsage: true;
  muiBorder: true;
  warningDark: true;
  white: true;
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    small: true;
    tiny: true;
    paragraph: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    tiny?: React.CSSProperties;
    paragraph?: React.CSSProperties;
  }
  interface TypographyVariants {
    small: React.CSSProperties;
    tiny: React.CSSProperties;
    paragraph: React.CSSProperties;
  }
}

declare module "@mui/material/styles" {
  interface CustomPalette {
    white: string;
    inactive: SimplePaletteColorOptions;
    neutralPink: SimplePaletteColorOptions;
    neutralGrey: SimplePaletteColorOptions;
    textSecondary: SimplePaletteColorOptions;
    textPrimary: SimplePaletteColorOptions;
    lightGrey: SimplePaletteColorOptions;
    midGrey: SimplePaletteColorOptions;
    darkGrey: SimplePaletteColorOptions;
    clear: SimplePaletteColorOptions;
    homepageKeyFeatures: SimplePaletteColorOptions;
    homepageUsage: SimplePaletteColorOptions;
    muiBorder: SimplePaletteColorOptions;
    warningDark: SimplePaletteColorOptions;
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}

  type AugmentedColorPaletteOptions = KeysMatching<
    Palette,
    SimplePaletteColorOptions | PaletteColor
  >;

  interface IconButtonProps {}
}

declare module "@mui/material/CircularProgress" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CircularProgressPropsColorOverrides extends ColorOverrides {}
}

declare module "@mui/material/Chip" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface ChipPropsColorOverrides extends ColorOverrides {}
}

declare module "@mui/material/Card" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CustomCardProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface CardOwnProps extends CustomCardProps {}
}

declare module "@mui/material/Paper" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CustomPaperProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface PaperOwnProps extends CustomPaperProps {}
}

declare module "@mui/material/IconButton" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface IconButtonPropsColorOverrides extends ColorOverrides {}

  interface CustomIconButtonProps {
    variant?: "contained" | "default";
  }
  interface IconButtonOwnProps extends CustomIconButtonProps {}
}

declare module "@mui/material/Divider" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CustomDividerProps {
    orientation?: "vertical" | "horizontal";
    gradient?: boolean;
    color?: AugmentedColorPaletteOptions | string;
  }
  interface DividerOwnProps extends CustomDividerProps {}
}

declare module "@mui/material/Switch" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CustomSwitchProps {
    color?: AugmentedColorPaletteOptions;
  }
  interface SwitchOwnProps extends CustomSwitchProps {}
}

declare module "@mui/material/Stepper" {
  type AugmentedColorPaletteOptions =
    import("@mui/material/styles").AugmentedColorPaletteOptions;

  interface CustomStepperProps {
    color?: AugmentedColorPaletteOptions;
  }

  interface StepperOwnProps extends CustomStepperProps {}
}

declare module "@mui/material/Modal" {
  interface CustomModalProps {
    outline?: boolean;
  }

  interface ModalOwnProps extends CustomModalProps {}
}
