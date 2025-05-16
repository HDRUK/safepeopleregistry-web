import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useStore } from "@/data/store";
import PageBodyContainer from "../PageBodyContainer";
import PageBody from "../PageBody";
import Text from "../../components/Text";

const NAMESPACE_TRANSLATION = "Profile";

export default function UserIdentity() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const { user } = useStore(state => ({
    user: state.current.user,
  }));

  const idvtComplete =
    !!user?.registry?.identity?.idvt_completed_at &&
    user?.registry?.identity?.idvt_result === 1;

  return (
    <PageBodyContainer>
      <PageBody>
        <Typography variant="h2">{t("identity")}</Typography>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>{t("name")}</Typography>
          <Typography>{`${user?.first_name} ${user?.last_name}`}</Typography>
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
      </PageBody>
    </PageBodyContainer>
  );
}
