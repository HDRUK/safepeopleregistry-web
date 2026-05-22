"use client";

import { Box, Button, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { getLoginUrl } from "@/utils/keycloak";
import { ROUTES } from "@/consts/router";
import { Link } from "@/i18n/routing";
import {
  StyledContent,
  StyledArticleContainer,
  StyledSectionFlex,
} from "./KeyFeatures.styles";
import { ButtonVariant } from "@/organisms/NavBar/NavBar";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS = "Homepage";
const YOUTUBE_MAX_WIDTH = 854;

export default function KeyFeatures() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <StyledContent>
      <StyledSectionFlex>
        <StyledArticleContainer>
          <Typography variant="h5" component="h6">
            {t("keyFeature1Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature1Info")}</Typography>
        </StyledArticleContainer>
        <StyledArticleContainer>
          <Typography variant="h5" component="h6">
            {t("keyFeature2Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature2Info")}</Typography>
        </StyledArticleContainer>
        <StyledArticleContainer>
          <Typography variant="h5" component="h6">
            {t("keyFeature3Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature3Info")}</Typography>
        </StyledArticleContainer>
      </StyledSectionFlex>
      <Box
        sx={{
          mt: 2,
          mb: 3,
          width: "100%",
          maxWidth: YOUTUBE_MAX_WIDTH,
          mx: "auto",
          aspectRatio: "16 / 9",
        }}>
        <iframe
          src="https://www.youtube.com/embed/kYLO_7gtBRo?si=sfXW1gOBlgS-5Str"
          title="YouTube video player"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}>
        <Button
          variant={ButtonVariant.Contained}
          href={ROUTES.register.path}
          startIcon={<HowToRegOutlinedIcon sx={{ height: 28, width: 28 }} />}
          size="large"
          sx={{
            padding: 2,
          }}>
          <Typography variant="h4">{t("registerNow")}</Typography>
        </Button>
        <Typography>
          {t("or")} <Link href={getLoginUrl()}>{t("signIn")}</Link>
        </Typography>
      </Box>
    </StyledContent>
  );
}
