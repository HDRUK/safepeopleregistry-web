"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import InviteUser from "@/modules/InviteUser";
import SendInviteCustodian from "@/modules/SendInviteCustodian";
import { OrganisationsList, UsersList } from "@/organisms";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  const sections = [
    {
      name: "custodian",
      component: <SendInviteCustodian />,
    },
    {
      name: "user",
      component: <InviteUser />,
    },
    {
      name: "sro",
      component: <OrganisationsList />,
    },
    {
      name: "users",
      component: <UsersList />,
    },
  ];

  return (
    <>
      {sections.map(({ name, component }) => (
        <Accordion>
          <AccordionSummary
            id={`data-${name}-invite`}
            aria-controls={`data-${name}-invite-content`}
            expandIcon={<ArrowDropDownIcon />}>
            <Typography>{t(`${name}InviteTitle`)}</Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
