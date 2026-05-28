import SupportCard from "@/components/SupportCard";
import { Box, SxProps, Theme } from "@mui/material";
import { getTranslations } from "next-intl/server";
import organisationSupport from "public/images/homepage/OrganisationSupport.png";
import userSupport from "public/images/homepage/UserSupport.png";
import dataCustodianSupport from "public/images/homepage/DataCustodianSupport.png";

const NAMESPACE_TRANSLATIONS = "HowItWorks";

const styledContent: SxProps<Theme> = {
  backgroundColor: "common.white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  mb: 2,
  width: "auto",
  color: "common.black",
};

const styledGrid: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "repeat(3, 1fr)",
  },
  gap: 6,
};

const userItems = [
  "saveTime",
  "fastSetup",
  "multipleOrganisations",
  "keepEverything",
  "automaticUpdates",
  "builtToMove",
];

const organisationItems = [
  "saveTime",
  "fastSetup",
  "multipleOrganisations",
  "automaticUpdates",
  "builtToMove",
];

const custodianItems = [
  "saveTime",
  "fastSetup",
  "multipleOrganisations",
  "automaticUpdates",
  "builtToMove",
];

export default async function Personas() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  const supportCards = [
    {
      src: userSupport,
      alt: "User support",
      title: t("headingUsers"),
      subTitle: t("subheadingUsers"),
      info: t("infoUsers"),
      items: userItems.map(item => ({
        title: t(`infoUsersItems.${item}.title`),
        body: t(`infoUsersItems.${item}.body`),
      })),
    },
    {
      src: organisationSupport,
      alt: "Organisation support",
      title: t("headingOrganisations"),
      subTitle: t("subheadingOrganisations"),
      info: t("infoOrganisations"),
      items: organisationItems.map(item => ({
        title: t(`infoOrganisationItems.${item}.title`),
        body: t(`infoOrganisationItems.${item}.body`),
      })),
    },
    {
      src: dataCustodianSupport,
      alt: "Data Custodian support",
      title: t("headingCustodians"),
      subTitle: t("subheadingCustodians"),
      info: t("infoCustodians"),
      items: custodianItems.map(item => ({
        title: t(`infoCustodianItems.${item}.title`),
        body: t(`infoCustodianItems.${item}.body`),
      })),
    },
  ];

  return (
    <Box sx={styledContent} component="section" aria-label="Users information">
      <Box sx={styledGrid}>
        {supportCards.map(card => (
          <SupportCard
            key={card.alt}
            src={card.src}
            alt={card.alt}
            title={card.title}
            subTitle={card.subTitle}
            info={card.info}
            headingSize="h5"
            listItems={card.items}
          />
        ))}
      </Box>
    </Box>
  );
}
