"use client";

import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ActionCard from "@/components/ActionCard";
import { CardConfig, resolveHref } from "@/components/ActionCard/types";
import { UserGroup } from "@/consts/user";
import links from "@/consts/links";
import { getMeQuery } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const NAMESPACE_TRANSLATIONS = "GetInvolved";

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

export default function GetInvolvedCards() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);
  const { data: meResponse } = useQuery(
    getMeQuery({ responseOptions: { suppressThrow: true } })
  );
  const userGroup = meResponse?.data?.user_group;

  return (
    <Grid container spacing={2}>
      {CARDS.map(card => (
        <Grid
          key={card.titleKey}
          size={{ sm: 12, md: 4 }}
          sx={{ display: "flex" }}>
          <ActionCard
            icon={card.icon}
            title={t(card.titleKey)}
            description={t.rich(card.descriptionKey ?? "")}
            href={resolveHref(card, userGroup)}
            ctaLabel={t(card.ctaLabelKey ?? "joinButton")}
          />
        </Grid>
      ))}
    </Grid>
  );
}
