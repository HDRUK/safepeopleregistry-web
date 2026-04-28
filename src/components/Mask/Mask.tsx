"use client";

import { AugmentedColorPaletteOptions, BoxProps } from "@mui/material";
import { StyledMask } from "./Mask.styles";

export interface QuoteProps extends Omit<BoxProps, "outlined"> {
  size?: string;
  color?: AugmentedColorPaletteOptions;
}

export default function Mask({
  children,
  size = "80px",
  color = "primary",
  ...restProps
}: QuoteProps) {
  return (
    <StyledMask {...restProps} width={size} height={size} color={color}>
      <div>{children}</div>
    </StyledMask>
  );
}
