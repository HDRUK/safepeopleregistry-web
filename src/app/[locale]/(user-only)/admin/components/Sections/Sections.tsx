"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import SendInviteCustodian from "@/modules/SendInviteCustodian";
import InviteUser from "@/modules/InviteUser";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { OrganisationsList } from "@/organisms";

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
      name: "organisations",
      component: <OrganisationsList />,
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
