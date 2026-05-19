import { Link } from "@/i18n/routing";
import { Box, Button, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { ButtonVariant } from "@/organisms/NavBar/NavBar";
import { ROUTES } from "@/consts/router";
import { getLoginUrl } from "@/utils/keycloak";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Homepage";

export default async function AuthButtons() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
        mb: 3,
      }}>
      <Button
        variant={ButtonVariant.Contained}
        href={ROUTES.register.path}
        startIcon={<HowToRegOutlinedIcon sx={{ height: 28, width: 28 }} />}
        size="large"
        sx={{
          padding: 2,
        }}>
        <Typography variant="h4" component="span">
          {t("registerNow")}
        </Typography>
      </Button>
      <Typography>
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
