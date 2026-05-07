import { Box, Typography } from "@mui/material";
import organisationSupport from "public/images/homepage/OrganisationSupport.png";
import userSupport from "public/images/homepage/UserSupport.png";
import { styledContent, styledGrid } from "./Support.styles";
import { getTranslations } from "next-intl/server";
import PageCenter from "@/modules/PageCenter";
import SupportCard from "@/app/[locale]/components/Support/SupportCard";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function Support() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  const supportCards = [
    {
      src: userSupport,
      alt: "User support",
      title: t("supportUsers"),
      info: t.rich("supportUsersInfo", {
        bold: chunks => <strong>{chunks}</strong>,
      }),
    },
    {
      src: organisationSupport,
      alt: "Organisation support",
      title: t("supportOrganisations"),
      info: t.rich("supportOrganisationsInfo", {
        bold: chunks => <strong>{chunks}</strong>,
      }),
    },
    {
      src: organisationSupport,
      alt: "Data Custodian support",
      title: t("supportCustodians"),
      info: t.rich("supportCustodiansInfo", {
        bold: chunks => <strong>{chunks}</strong>,
      }),
    },
  ];

  return (
    <Box sx={styledContent}>
      <Typography variant="h3" sx={{ mb: "24px" }}>
        {t("supportTitle")}
      </Typography>
      <PageCenter>
        <Box sx={styledGrid}>
          {supportCards.map(card => (
            <SupportCard
              key={card.alt}
              src={card.src}
              alt={card.alt}
              title={card.title}
              info={card.info}
            />
          ))}
        </Box>
      </PageCenter>
    </Box>
  );
}
