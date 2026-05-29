"use client";

import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ActionCard from "@/components/ActionCard";
import { useStore } from "@/data/store";
import { UserGroup } from "@/consts/user";
import links from "@/consts/links";

const NAMESPACE_TRANSLATIONS = "GetInvolved";

type CardHrefs = {
  loggedOut: string;
  [UserGroup.USERS]?: string;
  [UserGroup.ORGANISATIONS]?: string;
  [UserGroup.CUSTODIANS]?: string;
};

type CardConfig = {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  ctaLabelKey?: string;
  hrefs: CardHrefs;
};

const CARDS: CardConfig[] = [
  {
    icon: <MailOutlineIcon fontSize="large" />,
    titleKey: "mailingListTitle",
    descriptionKey: "mailingListDescription",
    ctaLabelKey: "mailingListButton",
    hrefs: {
      loggedOut: links.getInvolved.mailingList,
    },
  },
  {
    icon: <RecordVoiceOverOutlinedIcon fontSize="large" />,
    titleKey: "feedbackTitle",
    descriptionKey: "feedbackDescription",
    ctaLabelKey: "feedbackButton",
    hrefs: {
      loggedOut: links.getInvolved.survey,
      [UserGroup.USERS]: links.getInvolved.surveyUser,
      [UserGroup.CUSTODIANS]: links.getInvolved.surveyCustodian,
      [UserGroup.ORGANISATIONS]: links.getInvolved.surveyOrganisation,
    },
  },
  {
    icon: <AssignmentOutlinedIcon fontSize="large" />,
    titleKey: "surveyTitle",
    descriptionKey: "surveyDescription",
    ctaLabelKey: "surveyButton",
    hrefs: {
      loggedOut: links.getInvolved.feedback,
    },
  },
];

const resolveHref = (hrefs: CardHrefs, userGroup?: UserGroup): string => {
  if (userGroup && userGroup in hrefs) {
    return (hrefs as Record<string, string>)[userGroup] ?? hrefs.loggedOut;
  }
  return hrefs.loggedOut;
};

export default function GetInvolvedCards() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const userGroup = useStore(store => store.getUser()?.user_group);

  return (
    <Grid container spacing={2}>
      {CARDS.map(({ icon, titleKey, descriptionKey, ctaLabelKey, hrefs }) => (
        <Grid key={titleKey} size={{ sm: 12, md: 4 }} sx={{ display: "flex" }}>
          <ActionCard
            icon={icon}
            title={t(titleKey)}
            description={t(descriptionKey)}
            href={resolveHref(hrefs, userGroup)}
            ctaLabel={t(ctaLabelKey ?? "joinButton")}
          />
        </Grid>
      ))}
    </Grid>
  );
}
