"use client";

import { JOB_DELAY } from "@/consts/application";
import { PageBody } from "@/modules";
import InviteUser from "@/modules/InviteUser";
import SendInviteCustodian from "@/modules/SendInviteCustodian";
import { OrganisationsList, InvitesList, EmailsList } from "@/organisms";
import FeatureFlagList from "@/organisms/FeatureFlagsList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
  const queryClient = useQueryClient();

  const handleInviteSuccess = () => {
    setTimeout(() => {
      queryClient.refetchQueries({
        predicate: query =>
          ["getPendingInvites", "getEmails"].some(key =>
            query.queryKey.includes(key)
          ),
      });
    }, JOB_DELAY);
  };

  const sections = [
    { name: "features", component: <FeatureFlagList /> },
    {
      name: "custodian",
      component: <SendInviteCustodian onSuccess={handleInviteSuccess} />,
    },
    {
      name: "user",
      component: (
        <InviteUser onSuccess={handleInviteSuccess} combinedSuccess={false} />
      ),
    },
    {
      name: "sro",
      component: <OrganisationsList />,
    },
    {
      name: "invites",
      component: (
        <PageBody>
          <InvitesList />
        </PageBody>
      ),
    },
    {
      name: "emails",
      component: (
        <PageBody>
          <EmailsList />
        </PageBody>
      ),
    },
  ];

  return (
    <>
      {sections.map(({ name, component }) => (
        <Accordion data-cy={`data-${name}-invite`}>
          <AccordionSummary
            id={`data-${name}-invite`}
            aria-controls={`data-${name}-invite-content`}
            aria-label={t(`${name}InviteTitle`)}
            expandIcon={<ArrowDropDownIcon />}>
            <Typography>{t(`${name}InviteTitle`)}</Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
