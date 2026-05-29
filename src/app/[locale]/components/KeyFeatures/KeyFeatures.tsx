import { Box, Typography } from "@mui/material";
import {
  articleContainerSx,
  contentSx,
  sectionFlexSx,
} from "./KeyFeatures.styles";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function KeyFeatures() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box sx={contentSx}>
      <Box sx={sectionFlexSx} component="section">
        <Box component="article" sx={articleContainerSx}>
          <Typography variant="h5" component="h6">
            {t("keyFeature1Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature1Info")}</Typography>
        </Box>
        <Box component="article" sx={articleContainerSx}>
          <Typography variant="h5" component="h6">
            {t("keyFeature2Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature2Info")}</Typography>
        </Box>
        <Box component="article" sx={articleContainerSx}>
          <Typography variant="h5" component="h6">
            {t("keyFeature3Title")}
          </Typography>
          <Typography color="text.secondary">{t("keyFeature3Info")}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
