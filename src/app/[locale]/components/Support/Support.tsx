import { Box, Typography } from "@mui/material";
import dataCustodianSupport from "public/images/homepage/DataCustodianSupport.png";
import organisationSupport from "public/images/homepage/OrganisationSupport.png";
import userSupport from "public/images/homepage/UserSupport.png";
import Image from "next/image";
import { styledContainer, styledContent, styledGrid } from "./Support.styles";
import { getTranslations } from "next-intl/server";
import PageCenter from "@/modules/PageCenter";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function Support() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box sx={styledContent}>
      <Typography variant="h3" sx={{ mb: "24px" }}>
        {t("supportTitle")}
      </Typography>
      <PageCenter>
        <Box sx={styledGrid}>
          <Box sx={styledContainer}>
            <Image
              src={userSupport}
              alt="User support"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="h4"
              sx={{ my: 3, mb: 1.5 }}
              color="textPrimary">
              {t("supportUsers")}
            </Typography>
            <Typography color="textSecondary">
              {t.rich("supportUsersInfo", {
                bold: chunks => <strong>{chunks}</strong>,
              })}
            </Typography>
          </Box>
          <Box sx={styledContainer}>
            <Image
              src={organisationSupport}
              alt="Organisation support"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="h4"
              sx={{ my: 3, mb: 1.5 }}
              color="textPrimary">
              {t("supportOrganisations")}
            </Typography>
            <Typography color="textSecondary">
              {t.rich("supportOrganisationsInfo", {
                bold: chunks => <strong>{chunks}</strong>,
              })}
            </Typography>
          </Box>
          <Box sx={styledContainer}>
            <Image
              src={dataCustodianSupport}
              alt="Data Custodian support"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="h4"
              sx={{ my: 3, mb: 1.5 }}
              color="textPrimary">
              {t("supportCustodians")}
            </Typography>
            <Typography color="textSecondary">
              {t.rich("supportCustodiansInfo", {
                bold: chunks => <strong>{chunks}</strong>,
              })}
            </Typography>
          </Box>
        </Box>
      </PageCenter>
    </Box>
  );
}
