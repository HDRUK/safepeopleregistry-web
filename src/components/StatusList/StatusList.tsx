"use client";

import { Status } from "@/consts/application";
import { StatusCategory } from "@/consts/status";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import ActionsPanel from "../ActionsPanel";
import ChipStatus from "../ChipStatus";

export interface StatusListProps {
  projectStatus?: Status;
  validationStatus?: Status;
  organisationStatus?: Status;
  affiliationStatus?: Status;
  sponsorshipStatus?: Status;
}

const NAMESPACE_TRANSLATION = "Application";

type StatusRow = {
  label: string;
  value?: Status;
  dataCy: string;
  statusCategory?: StatusCategory;
};

export default function StatusList({
  projectStatus,
  validationStatus,
  organisationStatus,
  affiliationStatus,
  sponsorshipStatus,
}: StatusListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  let empties: StatusRow[] = [];

  if (sponsorshipStatus) {
    empties = [
      {
        label: t("sponsorshipStatus"),
        value: sponsorshipStatus,
        dataCy: "sponsorship-status",
        statusCategory: StatusCategory.SPONSORSHIP,
      },
    ];
  }

  const statuses: StatusRow[] = [
    {
      label: t("projectStatus"),
      value: projectStatus,
      dataCy: "project-status",
      statusCategory: StatusCategory.PROJECT,
    },
    ...empties,
    {
      label: t("validationStatus"),
      value: validationStatus,
      dataCy: "validation-status",
      statusCategory: StatusCategory.USER_VALIDATION,
    },
    {
      label: t("organisationStatus"),
      value: organisationStatus,
      dataCy: "organisation-status",
      statusCategory: StatusCategory.ORGANISATION_VALIDATION,
    },
    {
      label: t("affiliationStatus"),
      value: affiliationStatus,
      dataCy: "affiliation-status",
      statusCategory: StatusCategory.AFFILIATION,
    },
  ];

  return (
    <ActionsPanel
      data-cy="status-list"
      panelSx={{ backgroundColor: "neutralGrey.main", mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}>
        {statuses
          .filter(s => s.value)
          .map(({ label, value, dataCy, statusCategory }) => (
            <Box
              data-cy={dataCy}
              key={label}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography fontSize={18} sx={{ minWidth: 180 }}>
                {label}:
              </Typography>
              <ChipStatus status={value} statusCategory={statusCategory} />
            </Box>
          ))}
      </Box>
    </ActionsPanel>
  );
}
