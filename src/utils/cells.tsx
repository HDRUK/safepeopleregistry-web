"use client";

import { Status } from "@/consts/application";
import { Link } from "@/i18n/routing";
import { getName, injectParamsIntoPath } from "@/utils/application";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Link as MuiLink, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CellContext } from "@tanstack/react-table";
import ChipStatus from "../components/ChipStatus";
import FileDownloadLink from "../components/FileDownloadLink";
import SelectRole from "../components/SelectRole";
import { FileType } from "../consts/files";
import { PrimaryContactIcon } from "../consts/icons";
import {
  CustodianUser,
  File,
  Organisation,
  Project,
  ProjectAllUser,
  ProjectUser,
  ResearcherAffiliation,
  ResearcherProject,
  Role,
  Translations,
  User,
} from "../types/application";
import { formatShortDate } from "./date";

function renderAffiliationRelationship(
  info: CellContext<ResearcherAffiliation, unknown>,
  t: Translations
) {
  const value = info.getValue() as string;
  return value?.length > 0 ? t(info.getValue()) : null;
}

function renderAffiliationDateRangeCell<T extends ResearcherAffiliation>(
  info: CellContext<T, unknown>
) {
  const { from, to } = info.row.original;

  if (!from) return null;

  return (
    <Typography>
      {formatShortDate(from)} - {to || "Present"}
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

  const name = getName(user);

  return route ? renderLinkNameCell(name, route, options) : name;
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
      (values || [])
        .map(organisation => organisation?.organisation_name)
        .filter(organisationName => !!organisationName)
    );
  } else {
    names = values?.organisation_name;
  }

  return names;
}

function renderFileDownloadLink(files: File[], type: FileType) {
  const file = (files || []).find(file => file.type === type);

  if (!file) return null;

  return <FileDownloadLink file={file} />;
}

const renderOrganisationValidatedCell = (
  info: CellContext<Organisation, unknown>
) => {
  const systemApproved = info.getValue();

  return (
    <ChipStatus
      status={
        systemApproved
          ? Status.ORGANISATION_VALIDATED
          : Status.ORGANISATION_NOT_VALIDATED
      }
    />
  );
};

const renderSelectRoleCell = (
  info: CellContext<ProjectAllUser, unknown>,
  props: {
    roles: Role[];
    onRoleSelect: (row: ProjectAllUser, roleId: number | null) => void;
  }
) => {
  const roleId = info.row.original.role?.id ?? -1;
  const { onRoleSelect, roles } = props;

  return (
    <SelectRole
      variant="standard"
      size="small"
      value={roleId}
      roles={roles}
      onChange={({ target: { value } }) => {
        const parsedValue = value === "" ? null : Number(value);

        onRoleSelect(info.row.original, parsedValue);
      }}
    />
  );
};

const renderStatusCell = (
  info: CellContext<User | ProjectUser | Organisation, unknown>
) => <ChipStatus status={info.getValue() as Status} />;

export {
  renderAffiliationDateRangeCell,
  renderAffiliationRelationship,
  renderFileDownloadLink,
  renderLinkNameCell,
  renderListNameCell,
  renderOrganisationsNameCell,
  renderOrganisationValidatedCell,
  renderProjectNameCell,
  renderProjectsNameCell,
  renderProjectUserNameCell,
  renderSelectRoleCell,
  renderStatusCell,
  renderUserNameCell,
  renderUserOrganisationsNameCell,
  renderWarningCell,
};
