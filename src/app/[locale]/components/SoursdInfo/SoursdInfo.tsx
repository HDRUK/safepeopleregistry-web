import {
  contentSx,
  subtitleSx,
  titleSx,
} from "@/app/[locale]/components/SoursdInfo/SoursdInfo.styles";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Homepage";
const INFO_HEADING_ID = "homepage-info-title";

export default async function SoursdInfo() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box sx={contentSx} component={"section"} aria-labelledby={INFO_HEADING_ID}>
      <Typography sx={titleSx} variant="h1" id={INFO_HEADING_ID}>
        {t("infoTitle")}
      </Typography>
      <Typography sx={subtitleSx} variant="h1" component="h2">
        {t("info")}
      </Typography>
    </Box>
  );
}
