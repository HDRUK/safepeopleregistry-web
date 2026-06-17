import { ROUTES } from "@/consts/router";
import links from "@/consts/links";
import ExternalLink from "@/components/ExternalLink";
import { Link } from "@/i18n/routing";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function OpenAccess() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box component="section">
      <Typography variant="h2" sx={{ mb: 2 }}>
        {t("openAccessTitle")}
      </Typography>
      <Typography>
        {t.rich("openAccessContent", {
          openAccessLink: chunks => (
            <ExternalLink
              href={links.common.openAccessStatement}
              sx={{ color: "primary.main" }}>
              {chunks}
            </ExternalLink>
          ),
          getInvolvedLink: chunks => (
            <MuiLink component={Link} href={ROUTES.getInvolved.path}>
              {chunks}
            </MuiLink>
          ),
        })}
      </Typography>
    </Box>
  );
}
