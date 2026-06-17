"use server";

import { PageBodyContainer, PageSection } from "@/modules";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import GetInvolvedCards from "../GetInvolvedCards";

const NAMESPACE_TRANSLATIONS = "GetInvolved";
const ICON_SIZE = 48;

const LOGOS: { src: string; alt: string; width?: number; height?: number }[] = [
  {
    src: "/images/logos/alliance.svg",
    alt: "UK Health Data Research Alliance",
    width: 161,
    height: 82,
  },
  {
    src: "/images/logos/nhs.png",
    alt: "NHS England",
    width: 105,
    height: 81,
  },
  {
    src: "/images/logos/uk_tre.png",
    alt: "UK Trusted Research Environment Community",
    width: 211,
    height: 82,
  },
  {
    src: "/images/logos/hdruk.svg",
    alt: "Health Data Research UK",
    width: 172,
    height: 62,
  },
];

const ACKNOWLEDGEMENT_ITEMS = [
  "acknowledgementItem1",
  "acknowledgementItem2",
  "acknowledgementItem3",
  "acknowledgementItem4",
] as const;

export default async function GetInvolvedContent() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageBodyContainer heading={t("infoTitle")} component="article">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography>{t("intro1")}</Typography>
        <Typography>{t("intro2")}</Typography>
        <Typography>{t("intro3")}</Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <GetInvolvedCards />
      </Box>

      <PageSection sx={{ mt: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <FavoriteIcon
                sx={{
                  color: "primary.main",
                  flexShrink: 0,
                  fontSize: ICON_SIZE,
                }}
              />
              <Typography variant="h3">{t("acknowledgementTitle")}</Typography>
            </Box>
            <Stack component="ul" spacing={1} sx={{ mt: 2, pl: 2 }}>
              {ACKNOWLEDGEMENT_ITEMS.map(key => (
                <Typography component="li" key={key}>
                  {t(key)}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                alignItems: "center",
              }}>
              {LOGOS.map(({ src, alt, width, height }) => (
                <Box key={alt}>
                  <Image src={src} alt={alt} width={width} height={height} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </PageSection>
    </PageBodyContainer>
  );
}
