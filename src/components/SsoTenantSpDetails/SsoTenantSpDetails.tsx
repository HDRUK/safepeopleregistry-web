import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Copyable from "@/components/Copyable";
import { SsoTenant } from "@/services/sso_tenants/types";

const NAMESPACE_TRANSLATION = "SsoTenantSpDetails";

interface SsoTenantSpDetailsProps {
  ssoTenant: SsoTenant;
}

export default function SsoTenantSpDetails({
  ssoTenant,
}: SsoTenantSpDetailsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  if (!ssoTenant.sp_entity_id || !ssoTenant.sp_acs_url) {
    return null;
  }

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>
        {t("intro", { idpAlias: ssoTenant.idp_alias ?? "" })}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        {t("entityIdLabel")}
      </Typography>
      <Copyable sx={{ mb: 2, wordBreak: "break-all" }}>
        {ssoTenant.sp_entity_id}
      </Copyable>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        {t("acsUrlLabel")}
      </Typography>
      <Copyable sx={{ mb: 2, wordBreak: "break-all" }}>
        {ssoTenant.sp_acs_url}
      </Copyable>
      {ssoTenant.sp_metadata_url && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {t("metadataUrlLabel")}
          </Typography>
          <Copyable sx={{ wordBreak: "break-all" }}>
            {ssoTenant.sp_metadata_url}
          </Copyable>
        </>
      )}
    </Box>
  );
}
