"use client";

import { PageBody } from "@/modules";
import InviteUser from "@/modules/InviteUser";
import SendInviteCustodian from "@/modules/SendInviteCustodian";
import { OrganisationsList, InvitesList } from "@/organisms";
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
    queryClient.refetchQueries({
      queryKey: ["getPendingInvites"],
    });
  };

  const sections = [
    { name: "features", component: <FeatureFlagList /> },
    {
      name: "custodian",
      component: <SendInviteCustodian />,
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
