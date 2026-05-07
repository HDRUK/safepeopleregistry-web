import {
  contentSx,
  subtitleSx,
  titleSx,
} from "@/app/[locale]/components/SoursdInfo/SoursdInfo.styles";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function SoursdInfo() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box sx={contentSx}>
      <Typography sx={titleSx} variant="h1">
        {t("infoTitle")}
      </Typography>
      <Typography sx={subtitleSx} variant="h1" component="h2">
        {t("info")}
      </Typography>
    </Box>
  );
}
