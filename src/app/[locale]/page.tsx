import type { Metadata } from "next";
import { SITE_NAME } from "@/utils/metadata";
import { Footer, Header, MoreQuestions } from "@/modules";
import redirectApplication from "@/utils/router";
import SoursdInfo from "./components/SoursdInfo";
import Support from "@/app/[locale]/components/Support";
import { Box } from "@mui/material";
import { outerContentSx } from "@/app/[locale]/components/KeyFeatures/KeyFeatures.styles";
import PageCenter from "@/modules/PageCenter";
import SoursdUsages from "@/app/[locale]/components/SoursdUsages";
import KeyFeatures from "@/app/[locale]/components/KeyFeatures";
import YoutubeVideo from "@/components/YoutubeVideo";
import AuthButtons from "@/organisms/AuthButtons";

const USAGE_HEADING_ID = "homepage-usage-title";

export const metadata: Metadata = {
  title: SITE_NAME,
  description:
    "The Safe People Registry streamlines 'safe people' validation for sensitive data access, helping researchers, their organisations, and data custodians ensure rigorous security standards but with efficient processes.",
};

export default async function Page() {
  await redirectApplication();

  return (
    <>
      <Header />
      <main>
        <SoursdInfo />
        <Support />
        <Box
          component="section"
          sx={outerContentSx}
          aria-labelledby={USAGE_HEADING_ID}>
          <PageCenter>
            <SoursdUsages />
            <KeyFeatures />
            <YoutubeVideo />
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 6, my: 6 }}>
              <AuthButtons />
              <MoreQuestions />
            </Box>
          </PageCenter>
        </Box>
      </main>
      <Footer />
    </>
  );
}
