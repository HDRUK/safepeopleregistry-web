import { Box, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { downloadFile } from "../../services/files";
import { Organisation } from "../../types/application";
import { formatDisplayLongDate } from "../../utils/date";

interface OrganisationsDataSecurityComplianceDetailsProps {
  organisationData: Organisation;
  tKey?: string;
}

const NAMESPACE_TRANSLATION = "Organisations.DataSecurityCompliance";

export default function OrganisationsDataSecurityComplianceDetails({
  organisationData,
  tKey = NAMESPACE_TRANSLATION,
}: OrganisationsDataSecurityComplianceDetailsProps) {
  const t = useTranslations(tKey);

  const {
    ce_certification_num,
    ce_expiry_date,
    ce_expiry_evidence,
    ce_plus_certification_num,
    ce_plus_expiry_date,
    ce_plus_expiry_evidence,
    iso_27001_certification_num,
    iso_expiry_date,
    iso_expiry_evidence,
    dsptk_ods_code,
    dsptk_expiry_date,
    dsptk_expiry_evidence,
  } = organisationData;

  const data = [
    {
      name: t("ceCertification"),
      num: ce_certification_num,
      expiryDate: ce_expiry_date,
      file: ce_expiry_evidence,
    },
    {
      name: t("cePlusCertification"),
      num: ce_plus_certification_num,
      expiryDate: ce_plus_expiry_date,
      file: ce_plus_expiry_evidence,
    },
    {
      name: t("iso27001Certification"),
      num: iso_27001_certification_num,
      expiryDate: iso_expiry_date,
      file: iso_expiry_evidence,
    },
    {
      name: t("dsptkOdsCode"),
      num: dsptk_ods_code,
      expiryDate: dsptk_expiry_date,
      file: dsptk_expiry_evidence,
    },
  ].filter(({ num }) => !!num);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {data.map(({ name, num, expiryDate, file }) => (
        <div key={name}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div>
              <Typography variant="h6" fontSize="1rem">
                {t("id")}
              </Typography>
              <Typography>{num}</Typography>
            </div>
            {expiryDate && (
              <div>
                <Typography variant="h6" fontSize="1rem">
                  {t("expiryDate")}
                </Typography>
                <Typography>{formatDisplayLongDate(expiryDate)}</Typography>
              </div>
            )}
            {file?.id && (
              <div>
                <Typography variant="h6" fontSize="1rem">
                  {t("certificate")}
                </Typography>
                <Link onClick={() => downloadFile(file?.id as number)}>
                  {t("downloadEvidence")}
                </Link>
              </div>
            )}
          </Box>
        </div>
      ))}
    </Box>
  );
}
