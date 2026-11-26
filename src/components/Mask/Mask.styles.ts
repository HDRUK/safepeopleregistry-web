import { AugmentedColorPaletteOptions, Box, css, styled } from "@mui/material";
import { getAugmentedColor } from "../../utils/theme";

interface MaskProps {
  width: string;
  height: string;
  color?: AugmentedColorPaletteOptions;
}

export const StyledMask = styled(Box)<MaskProps>(
  ({ theme, width, height, color = "primary" }) => css`
    background: ${getAugmentedColor(theme, color).main};
    padding: 2px;
    box-sizing: border-box;
    border-radius: 50%;
    font-size: 1cqi;
    color: ${getAugmentedColor(theme, color).contrastText};

    > div {
      width: calc(${width} - 4px);
      height: calc(${height} - 4px);
      border-radius: calc((${width} - 4px) / 2);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      > * {
        width: calc(${width} - 4px);
        height: calc(${height} - 4px);
      }
    }
  `
);
