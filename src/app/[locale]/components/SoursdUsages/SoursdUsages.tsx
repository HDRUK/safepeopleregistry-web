"use client";

import { Typography } from "@mui/material";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { framerFadeIn } from "@/utils/framer";
import {
  StyledOuterContent,
  StyledContent,
  StyledContainer,
  StyledFlex,
  StyledBox,
} from "./SoursdUsages.styles";
import { useTranslations } from "next-intl";
import KeyFeatures from "@/app/[locale]/components/KeyFeatures";
import PageCenter from "@/modules/PageCenter";

const NAMESPACE_TRANSLATIONS = "Homepage";
const ICON_SIZE = 60;

export default function SoursdUsages() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <StyledOuterContent>
      <PageCenter>
        <StyledContainer>
          <StyledContent>
            <Typography variant="h4" component="h3" mb={2}>
              {t("usageInfo")}
            </Typography>

            <StyledFlex>
              <StyledBox
                {...framerFadeIn}
                transition={{ ...framerFadeIn.transition, delay: 0 }}>
                <FastForwardOutlinedIcon sx={{ fontSize: ICON_SIZE }} />
                <Typography variant="h5">
                  {t("accelerateValidation")}
                </Typography>
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

        <KeyFeatures />
      </PageCenter>
    </StyledOuterContent>
  );
}
