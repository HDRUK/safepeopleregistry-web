"use client";

import ChipStatus, { Status } from "@/components/ChipStatus";
import { PrimaryContactIcon } from "@/consts/icons";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Link as MuiLink, Typography } from "@mui/material";
import { Link } from "@/i18n/routing";
import { Box } from "@mui/system";
import { CellContext } from "@tanstack/react-table";
import {
  CustodianUser,
  Organisation,
  Project,
  ProjectAllUser,
  ProjectUser,
  ResearcherAffiliation,
  ResearcherProject,
  User,
} from "../types/application";
import { injectParamsIntoPath } from "./application";
import { formatShortDate } from "./date";

function renderAffiliationDateRangeCell<T extends ResearcherAffiliation>(
  info: CellContext<T, unknown>
) {
  const { from, to } = info.row.original;

  if (!from) return null;

  return (
    <Typography>
      {formatShortDate(from)} - {to ? formatShortDate(to) : "Present"}
    </Typography>
  );
}

function renderProjectNameCell<T extends Project>(
  info: CellContext<T, unknown>,
  route?: string
) {
  const { title, id } = info.row.original;

  return (
    <Typography color="primary" variant="small">
      {route ? (
        <MuiLink
          component={Link}
          href={injectParamsIntoPath(route, {
            id,
          })}>
          {title}
        </MuiLink>
      ) : (
        title
      )}
    </Typography>
  );
}

function renderLinkNameCell(
  name: string,
  route: string,
  options: Record<string, number>
) {
  return (
    <MuiLink
      component={Link}
      href={injectParamsIntoPath(route, options)}
      color="secondary.main">
      {name}
    </MuiLink>
  );
}

function renderUserNameCell(
  user: User | ProjectAllUser | CustodianUser,
  route?: string,
  options: Record<string, number> = {}
) {
  if (!user) return "";

  const { first_name, last_name } = user;

  return route
    ? renderLinkNameCell(`${first_name} ${last_name}`, route, options)
    : `${first_name} ${last_name}`;
}

const renderProjectUserNameCell = (data: ProjectUser, route: string) => {
  const {
    id,
    primary_contact,
    registry: { user },
  } = data;

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {renderUserNameCell(user, route, {
        projectUserId: id,
        userId: user.id,
      })}
      {!!primary_contact && <PrimaryContactIcon fontSize="small" />}
    </Box>
  );
};

function renderWarningCell<T extends ResearcherAffiliation>(
  info: CellContext<T, unknown>
) {
  const { organisation_id, email } = info.row.original;

  if (!organisation_id || !email) {
    return <WarningAmberOutlinedIcon sx={{ color: "warning.main" }} />;
  }
  return null;
}

function renderListNameCell(values: string[] | undefined) {
  return (values || []).map(value => value).join(", ");
}

function renderProjectsNameCell(values: ResearcherProject[]) {
  return renderListNameCell((values || []).map(({ title }) => title));
}

function renderUserOrganisationsNameCell(
  values: Organisation | Organisation[] | undefined
) {
  const names = values && renderOrganisationsNameCell(values);

  return (
    names || (
      <Typography component="span" color="error">
        Not affiliated
      </Typography>
    )
  );
}

function renderOrganisationsNameCell(values: Organisation | Organisation[]) {
  let names;

  if (Array.isArray(values)) {
    names = renderListNameCell(
      (values || []).map(({ organisation_name }) => organisation_name)
    );
  } else {
    names = values?.organisation_name;
  }

  return names;
}

const renderStatusCell = (info: CellContext<User | ProjectUser, unknown>) => (
  <ChipStatus status={info.getValue() as Status} />
);

export {
  renderAffiliationDateRangeCell,
  renderLinkNameCell,
  renderListNameCell,
  renderOrganisationsNameCell,
  renderProjectNameCell,
  renderProjectsNameCell,
  renderProjectUserNameCell,
  renderStatusCell,
  renderUserNameCell,
  renderUserOrganisationsNameCell,
  renderWarningCell,
};
