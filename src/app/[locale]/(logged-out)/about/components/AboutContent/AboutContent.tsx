import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ExternalLink from "@/components/ExternalLink";
import theme from "@/theme";

const NAMESPACE_TRANSLATIONS = "About";

const FIVE_SAFES_LINK =
  "https://www.hdruk.ac.uk/access-to-health-data/trusted-research-environments/";
const TECH_TEAM_LINK = "https://healthdatagateway.org/en/about/meet-the-team";
const OPEN_ACCESS_LINK =
  "https://www.hdruk.ac.uk/about-us/policies/open-access-statement/";
const GET_INVOLVED_LINK = "#";

const SECTION_IDS = {
  background: "about-background-heading",
  history: "about-history-heading",
  openAccess: "about-open-access-heading",
} as const;

export default async function AboutContent() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageBodyContainer heading={t("infoTitle")} component="article">
      <Typography sx={{ mt: 2 }}>{t("mission")}</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 6, mt: 4 }}>
        <PageColumns
          component="section"
          aria-labelledby={SECTION_IDS.background}>
          <PageColumnBody size={{ xs: 12, lg: 8 }}>
            <Typography variant="h2" id={SECTION_IDS.background} gutterBottom>
              {t("backgroundTitle")}
            </Typography>
            <PageSection>
              <Typography mb={2}>
                {t.rich("backgroundParagraph1", {
                  fiveSafesLink: chunks => (
                    <ExternalLink
                      href={FIVE_SAFES_LINK}
                      sx={{ color: "primary.main" }}>
                      {chunks}
                    </ExternalLink>
                  ),
                })}
              </Typography>
              <Typography>
                {t.rich("backgroundParagraph2", {
                  techLink: chunks => (
                    <ExternalLink
                      href={TECH_TEAM_LINK}
                      sx={{ color: "primary.main" }}>
                      {chunks}
                    </ExternalLink>
                  ),
                })}
              </Typography>
            </PageSection>
          </PageColumnBody>
          <PageColumnDetails size={{ xs: 12, lg: 4 }}>
            <Image
              src="/images/about/five-safes.png"
              alt={t("backgroundImageAlt")}
              width={0}
              height={0}
              sizes={`(max-width: ${theme.breakpoints.values.lg}px) 100vw, 33vw`}
              style={{ width: "100%", height: "auto" }}
            />
          </PageColumnDetails>
        </PageColumns>

        <PageColumns component="section" aria-labelledby={SECTION_IDS.history}>
          <PageColumnDetails size={{ xs: 12, lg: 4 }}>
            <Image
              src="/images/about/history.png"
              alt={t("historyImageAlt")}
              width={0}
              height={0}
              sizes={`(max-width: ${theme.breakpoints.values.lg}px) 100vw, 33vw`}
              style={{ width: "100%", height: "auto" }}
            />
          </PageColumnDetails>
          <PageColumnBody size={{ xs: 12, lg: 8 }}>
            <Typography variant="h2" id={SECTION_IDS.history} gutterBottom>
              {t("historyTitle")}
            </Typography>
            <PageSection>
              <Typography mb={2}>{t("historyParagraph1")}</Typography>
              <Typography mb={1}>{t("historyParagraph2")}</Typography>
              <ul>
                <li>
                  <Typography>{t("historyItem1")}</Typography>
                </li>
                <li>
                  <Typography>{t("historyItem2")}</Typography>
                </li>
                <li>
                  <Typography>{t("historyItem3")}</Typography>
                </li>
              </ul>
              <Typography mt={2}>{t("historyOutro")}</Typography>
            </PageSection>
          </PageColumnBody>
        </PageColumns>

        <PageSection
          component="section"
          aria-labelledby={SECTION_IDS.openAccess}>
          <Typography variant="h2" id={SECTION_IDS.openAccess} gutterBottom>
            {t("openAccessTitle")}
          </Typography>
          <Typography>
            {t.rich("openAccessText", {
              openAccessLink: chunks => (
                <ExternalLink
                  href={OPEN_ACCESS_LINK}
                  sx={{ color: "primary.main" }}>
                  {chunks}
                </ExternalLink>
              ),
              getInvolvedLink: chunks => (
                <ExternalLink
                  href={GET_INVOLVED_LINK}
                  sx={{ color: "primary.main" }}>
                  {chunks}
                </ExternalLink>
              ),
            })}
          </Typography>
        </PageSection>
      </Box>
    </PageBodyContainer>
  );
}
