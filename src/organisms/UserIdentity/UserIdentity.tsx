import { useStore } from "@/data/store";
import { getName } from "@/utils/application";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Text from "../../components/Text";

const NAMESPACE_TRANSLATION = "Users.Identity";

export default function UserIdentity() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { user } = useStore(state => ({
    user: state.current.user,
  }));

  const idvtComplete =
    !!user?.registry?.identity?.idvt_completed_at &&
    user?.registry?.identity?.idvt_success === 1;

  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>{t("name")}</Typography>
        <Typography>{getName(user)}</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>{t("digiIdent")}</Typography>
        <Text copyable>{`${user?.registry.digi_ident}`}</Text>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>{t("location")}</Typography>
        <Text startIcon={user?.location ? null : <ErrorIcon color="error" />}>
          {user?.location || t("locationMissing")}
        </Text>
      </Box>
      <Text
        sx={{ fontWeight: 600 }}
        startIcon={idvtComplete ?? <ErrorIcon color="error" />}>
        {idvtComplete ? t("idvtComplete") : t("idvtIncomplete")}
      </Text>
    </>
  );
}
