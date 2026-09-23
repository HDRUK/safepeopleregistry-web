"use client";

import { Box, Link, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { getOrganisationDelegatesQuery } from "@/services/organisations";
import { getName } from "@/utils/application";
import { Organisation } from "../../types/application";

export interface OrganisationDetailsSlimProps {
  organisation: Organisation;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function OrganisationDetailsSlim({
  organisation,
}: OrganisationDetailsSlimProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const organisationId = organisation?.id;

  const { data: delegatesResponse } = useQuery(
    getOrganisationDelegatesQuery(organisationId as number, !!organisationId)
  );

  const allDelegates = delegatesResponse?.data || [];
  const delegates = allDelegates.slice(0, 2);
  const hiddenDelegates = allDelegates.slice(2);

  if (!organisation) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="flex-start" sx={{ pb: 2, gap: 3 }}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" sx={{ flexWrap: 1 }}>
          {organisation.organisation_name}
        </Typography>
        <Typography>
          {t("organisationDetailsDelegatesLabel")}{" "}
          {delegates.map((delegate, index) => (
            <Fragment key={delegate.id}>
              <Link href={`mailto:${delegate.email}`} color="primary">
                {getName(delegate)}
              </Link>
              {index < delegates.length - 1 && ", "}
            </Fragment>
          ))}
          {hiddenDelegates.length > 0 && (
            <Tooltip title={hiddenDelegates.map(getName).join(", ")} arrow>
              <Box component="span" sx={{ cursor: "default" }}>
                {" "}
                +{hiddenDelegates.length}
              </Box>
            </Tooltip>
          )}
        </Typography>
        <Typography>
          {t("organisationDetailsSroLabel")}{" "}
          {organisation.sro_officer ? (
            <Link
              href={`mailto:${organisation.sro_officer.email}`}
              color="primary">
              {getName(organisation.sro_officer)}
            </Link>
          ) : (
            t("organisationDetailsSroNoneAppointed")
          )}
        </Typography>
      </Box>
    </Box>
  );
}
