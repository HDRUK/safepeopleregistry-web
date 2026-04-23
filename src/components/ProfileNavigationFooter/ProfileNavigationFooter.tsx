"use client";

import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import SoursdLogo from "../SoursdLogo";
import ButtonSave from "../ButtonSave";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export type ProfileNavigationFooterProps = {
  nextStepText?: string;
  isLoading?: boolean;
  previousHref?: string;
  nextHref?: string;
  isDisabled?: boolean;
  isLastStep?: boolean;
  onClick?: () => void;
};

export default function ProfileNavigationFooter({
  previousHref,
  nextHref,
  nextStepText,
  isLoading,
  isDisabled = false,
  isLastStep = false,
  onClick,
}: ProfileNavigationFooterProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const nextButtonText = isLastStep
    ? tProfile("finishLinkText")
    : nextStepText
      ? tProfile("submitAndContinueButton")
      : tProfile("submitButton");

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 3 }}>
        {previousHref && (
          <Button
            href={previousHref}
            component="a"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ my: 1 }}>
            {tProfile("previousButton")}
          </Button>
        )}
      </Grid>
      <Grid size={{ xs: 6 }}>
        {nextStepText && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <SoursdLogo size={50} />
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ fontWeight: "bold", mr: 1 }}>
              Next Step:
            </Typography>
            <Typography>{nextStepText}</Typography>
          </Box>
        )}
      </Grid>
      <Grid
        size={{ xs: 3 }}
        sx={{ display: "flex", justifyContent: "flex-end" }}>
        {!nextHref ? (
          <ButtonSave
            isLoading={isLoading}
            sx={{ my: 1 }}
            disabled={isDisabled}
            onClick={onClick && (() => onClick())}>
            {nextButtonText}
          </ButtonSave>
        ) : (
          <ButtonSave
            href={nextHref}
            component="a"
            sx={{ my: 1 }}
            disabled={isDisabled}>
            {nextButtonText}
          </ButtonSave>
        )}
      </Grid>
    </Grid>
  );
}
