import { Box, Button, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { ButtonVariant } from "@/organisms/NavBar/NavBar";
import { ROUTES } from "@/consts/router";
import { getLoginUrl } from "@/utils/keycloak";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function AuthButtons() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box
      component="section"
      aria-label={t("getStartedLabel")}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
      }}>
      <Button
        variant={ButtonVariant.Contained}
        href={ROUTES.register.path}
        startIcon={<HowToRegOutlinedIcon sx={{ height: 18, width: 18 }} />}
        size="large"
        sx={{
          px: 1.5,
          py: 1.1,
        }}>
        <Typography component="span">{t("registerNow")}</Typography>
      </Button>
      <Typography sx={{ color: "primary.main" }}>
        {t("or")}{" "}
        <Typography
          component={Link}
          href={getLoginUrl()}
          sx={{
            color: "primary.main",
          }}>
          {t("signIn")}
        </Typography>
      </Typography>
    </Box>
  );
}
