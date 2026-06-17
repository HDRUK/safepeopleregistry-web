"use client";

import { Grid, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ActionCard from "@/components/ActionCard";
import { CardConfig, resolveHref } from "@/components/ActionCard/types";
import links from "@/consts/links";
import { ROUTES } from "@/consts/router";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { UserGroup } from "@/consts/user";
import { getMeQuery } from "@/services/auth";

const NAMESPACE_TRANSLATIONS = "ContactUs";

export default function ContactCards() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS);

  const { data: meResponse } = useQuery(
    getMeQuery({ responseOptions: { suppressThrow: true } })
  );

  const userGroup = meResponse?.data?.user_group;

  const cards: CardConfig[] = [
    {
      icon: <HelpOutlineIcon fontSize="large" />,
      titleKey: "questionTitle",
      descriptionKey: "questionDescription",
      ctaLabelKey: "questionButton",
      href: ROUTES.faq.path,
    },
    {
      icon: <FeedbackOutlinedIcon fontSize="large" />,
      titleKey: "helpTitle",
      descriptionKey: "helpDescription",
      ctaLabelKey: "helpButton",
      hrefs: {
        loggedOut: links.help.loggedOut,
        [UserGroup.CUSTODIANS]: links.help.custodian,
        [UserGroup.USERS]: links.help.user,
        [UserGroup.ORGANISATIONS]: links.help.organisation,
      },
    },
    {
      icon: <GroupsOutlinedIcon fontSize="large" />,
      titleKey: "getInvolvedTitle",
      descriptionKey: "getInvolvedDescription",
      ctaLabelKey: "getInvolvedButton",
      href: links.getInvolved.mailingList,
    },
    {
      icon: <MailOutlineIcon fontSize="large" />,
      titleKey: "emailTitle",
      descriptionKey: "emailDescription",
      ctaLabelKey: "emailButton",
      href: `mailto:${CONTACT_MAIL_ADDRESS}`,
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map(card => (
        <Grid
          key={card.titleKey}
          size={{ sm: 12, md: 4 }}
          sx={{ display: "flex" }}>
          <ActionCard
            icon={card.icon}
            title={t(card.titleKey)}
            description={t.rich(card.descriptionKey ?? "", {
              emailLink: chunks => (
                <Link href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{chunks}</Link>
              ),
            })}
            href={resolveHref(card, userGroup)}
            ctaLabel={t(card.ctaLabelKey ?? "joinButton")}
          />
        </Grid>
      ))}
    </Grid>
  );
}
