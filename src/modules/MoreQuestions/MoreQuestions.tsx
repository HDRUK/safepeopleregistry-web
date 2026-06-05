import { DiversityIconFill, QuizIcon } from "@/components/icons";
import ExternalLink from "@/components/ExternalLink";
import links from "@/consts/links";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { Link } from "@/i18n/routing";
import { getDecodedAccessToken } from "@/utils/auth";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

const NAMESPACE_TRANSLATIONS = "Common";

const HELP_LINKS: Partial<Record<UserGroup, string>> = {
  [UserGroup.USERS]: links.help.user,
  [UserGroup.CUSTODIANS]: links.help.custodian,
  [UserGroup.ORGANISATIONS]: links.help.organisation,
};

const linkSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: "primary.main",
};

export default async function MoreQuestions() {
  const t = await getTranslations(NAMESPACE_TRANSLATIONS);
  const decoded = await getDecodedAccessToken();
  const userGroup = decoded?.user_group;
  const helpLink = (userGroup && HELP_LINKS[userGroup]) ?? links.help.loggedOut;

  return (
    <Box component="section" sx={{ textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        {t("moreQuestionsTitle")}
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        flexWrap="wrap">
        <ExternalLink href={helpLink} sx={linkSx}>
          <DiversityIconFill sx={{ fontSize: 24 }} />
          {t("moreQuestionsAskTeam")}
        </ExternalLink>
        <MuiLink component={Link} href={ROUTES.faq.path} sx={linkSx}>
          <QuizIcon sx={{ fontSize: 24 }} />
          {t("moreQuestionsFAQ")}
        </MuiLink>
      </Stack>
    </Box>
  );
}
