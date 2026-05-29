"use client";

import { Typography } from "@mui/material";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { framerFadeIn } from "@/utils/framer";
import {
  StyledContent,
  StyledContainer,
  StyledFlex,
  StyledBox,
} from "./SoursdUsages.styles";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Homepage";
const ICON_SIZE = 60;
const USAGE_HEADING_ID = "homepage-usage-title";

export default function SoursdUsages() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <StyledContainer>
      <StyledContent>
        <Typography variant="h4" mb={2} id={USAGE_HEADING_ID}>
          {t("usageInfo")}
        </Typography>

        <StyledFlex>
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 0 }}>
            <FastForwardOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
            <Typography variant="h5">{t("accelerateValidation")}</Typography>
          </StyledBox>
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 0.5 }}>
            <RepeatOneIcon sx={{ fontSize: ICON_SIZE }} />
            <Typography variant="h5">{t("preventDuplication")}</Typography>
          </StyledBox>
          <StyledBox
            {...framerFadeIn}
            transition={{ ...framerFadeIn.transition, delay: 1 }}>
            <ChecklistIcon sx={{ fontSize: ICON_SIZE }} />
            <Typography variant="h5">{t("easilyTrack")}</Typography>
          </StyledBox>
        </StyledFlex>
      </StyledContent>
    </StyledContainer>
  );
}
