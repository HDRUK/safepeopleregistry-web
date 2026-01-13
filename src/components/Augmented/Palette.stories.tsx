import type { Meta, StoryObj } from "@storybook/react";

import {
  AugmentedColorPaletteOptions,
  Box,
  Card,
  Grid,
  SimplePaletteColorOptions,
  Typography,
} from "@mui/material";
import { PALETTE_THEME_PURPLE_BLUE } from "../../config/theme";

const meta = {
  title: "Palette",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const PaletteColors = ({
  paletteTheme: { palette },
}: {
  paletteTheme: {
    palette: Record<AugmentedColorPaletteOptions, SimplePaletteColorOptions>;
  };
}) => (
  <Grid container gap={3}>
    {Object.entries(palette).map(([key, colors]) => {
      return (
        <Box key={key}>
          <Typography variant="subtitle1" mb={1}>
            {key}
          </Typography>
          <Grid container gap={1} minHeight="80px">
            <Box
              sx={{
                backgroundColor: colors.main,
                color: colors.contrastText,
                p: 2,
                width: "170px",
              }}>
              <b>{colors.main}</b> / main
            </Box>
            <Box
              sx={{
                backgroundColor: colors.contrastText,
                color: "#fff",
                p: 2,
                width: "170px",
              }}>
              <b>{colors.contrastText}</b> / contrastText
            </Box>
            <Box
              sx={{
                backgroundColor: colors.light,
                color: colors.contrastText,
                p: 2,
                width: "170px",
              }}>
              <b>{colors.light}</b> / light
            </Box>
            <Box
              sx={{
                backgroundColor: colors.dark,
                color: colors.contrastText,
                p: 2,
                width: "170px",
              }}>
              <b>{colors.dark}</b> / dark
            </Box>
          </Grid>
        </Box>
      );
    })}
  </Grid>
);

export const PurpleAndBlue: Story = {
  render: () => <PaletteColors paletteTheme={PALETTE_THEME_PURPLE_BLUE} />,
};
