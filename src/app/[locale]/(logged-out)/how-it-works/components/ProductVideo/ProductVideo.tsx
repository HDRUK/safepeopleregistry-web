import YoutubeVideo from "@/components/YoutubeVideo/YoutubeVideo";
import AuthButtons from "@/organisms/AuthButtons";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "HowItWorks";
const VIDEO_HEADING_ID = "demo-video-title";

const styledContent: SxProps<Theme> = {
  backgroundColor: "common.white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 3,
  width: "100%",
  color: "common.black",
};

export default async function ProductVideo() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box
      sx={styledContent}
      component="section"
      aria-labelledby={VIDEO_HEADING_ID}>
      <Typography variant="h5" id={VIDEO_HEADING_ID} component="h2">
        {t("videoIntro")}
      </Typography>
      <YoutubeVideo videoId="videoseries?list=PLBI5k9SgYrItRrYeOpErLZ2yuQ4xvoUgM" />
      <AuthButtons />
    </Box>
  );
}
