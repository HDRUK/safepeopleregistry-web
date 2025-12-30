"use client";

import { Status } from "@/consts/application";
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

export default function StatusList({
  projectStatus,
  validationStatus,
  organisationStatus,
  affiliationStatus,
  sponsorshipStatus,
}: StatusListProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  let empties: { label: string; value: string }[] = [];

  if (sponsorshipStatus) {
    empties = [
      {
        label: t("sponsorshipStatus"),
        value: sponsorshipStatus,
      },
    ];
  }

  const statuses: { label: string; value?: Status }[] = [
    { label: t("projectStatus"), value: projectStatus },
    ...empties,
    { label: t("validationStatus"), value: validationStatus },
    { label: t("organisationStatus"), value: organisationStatus },
    { label: t("affiliationStatus"), value: affiliationStatus },
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
          .map(({ label, value }) => (
            <Box
              key={label}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography fontSize={18} sx={{ minWidth: 180 }}>
                {label}:
              </Typography>
              <ChipStatus status={value} />
            </Box>
          ))}
      </Box>
    </ActionsPanel>
  );
}
