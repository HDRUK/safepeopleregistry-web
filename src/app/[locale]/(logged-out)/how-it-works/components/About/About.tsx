import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import { getTranslations } from "next-intl/server";
import { Typography } from "@mui/material";
import Image from "next/image";

const NAMESPACE_TRANSLATIONS = "HowItWorks";

export default async function About() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <PageBodyContainer heading={t("infoTitle")} component="section">
      <PageColumns>
        <PageColumnBody size={{ lg: 6 }}>
          <PageSection fontSize={18}>
            <Typography>{t("intro")}</Typography>
          </PageSection>
        </PageColumnBody>
        <PageColumnDetails size={{ xs: 12, lg: 6 }}>
          <Image
            src="/images/howitworks.png"
            alt={t("keyImageAlt")}
            width={672}
            height={160}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
