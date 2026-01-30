import { GetSystemConfigResponse } from "@/services/system_config/types";
import { Organisation, ResearcherProject } from "@/types/application";
import { Status, VALIDATION_SCHEMA_KEY } from "../consts/application";
import { escapeAndParse } from "./json";

function canUseIdvt(country: string | undefined) {
  return Boolean(
    country && ["United Kingdom", "UK"].find(item => item === country)
  );
}

function isSponsorshipStatusApproved(project: ResearcherProject) {
  const statusProject = (
    project?.custodian_has_project_sponsorships ||
    project?.project_has_sponsorships?.[0]
  )?.model_state?.state.slug;

  return statusProject === Status.SPONSORSHIP_APPROVED;
}

function getSponsorshipStatus(
  organisation: Organisation | undefined,
  project: ResearcherProject
) {
  const statusOrg = organisation?.model_state?.state.slug;

  const statusProject =
    (
      project?.project_has_sponsorships?.[0]
        ?.custodian_has_project_has_sponsorship?.[0] ||
      project?.custodian_has_project_sponsorships
    )?.model_state?.state.slug || "";

  if (statusOrg === Status.INVITED) {
    return statusOrg;
  }

  if (
    organisation?.id ===
      (project?.sponsors?.[0]?.id ||
        project?.project_has_sponsorships?.[0]?.sponsor_id) &&
    (statusProject === Status.SPONSORSHIP_APPROVED ||
      statusProject === Status.SPONSORSHIP_REJECTED ||
      statusProject === Status.SPONSORSHIP_PENDING)
  ) {
    return statusProject;
  }

  return statusOrg;
}

function getSponsor(project: ResearcherProject) {
  return project?.project_has_sponsorships?.[0]?.sponsor;
}

function getStatus(slug: string) {
  switch (slug) {
    case Status.PROJECT_APPROVED:
      return "Approved";
    case Status.PROJECT_PENDING:
      return "Pending approval";
    case Status.AFFILIATION_APPROVED:
      return "Approved";
    case Status.AFFILIATION_EMAIL_VERIFY:
      return "Email verification needed";
    case Status.AFFILIATION_PENDING:
      return "Pending";
    case Status.AFFILIATION_REJECTED:
      return "Declined";
    case Status.AFFILIATED:
      return "Affiliated";
    case Status.AFFILIATION_LEFT:
      return "Left organisation";
    case Status.AFFILIATION_INVITED:
      return "Invited";
    case Status.ORGANISATION_NOT_VALIDATED:
      return "Declined Validation";
    case Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER:
      return "Escalation to Validation Manager";
    case Status.PENDING:
      return "Pending";
    case Status.INVITED:
      return "Invited";
    default:
      return slug;
  }
}

const getShortStatus = (slug: string) => {
  switch (slug) {
    case Status.PENDING:
      return "Pending";
    case Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER:
      return "Escalation";
    case Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER:
      return "Escalation";
    case Status.AFFILIATION_EMAIL_VERIFY:
      return "Email verification needed";
    default:
      return slug;
  }
};

const getName = <T extends { first_name: string; last_name: string }>({
  first_name,
  last_name,
}: T) => {
  return `${first_name} ${last_name}`;
};

const getAbbreviatedListWithCount = <T>(data: T[], n: number = 1) => {
  const items = data.slice(0, n);

  return {
    items,
    count: data.length > n ? data.length - n : 0,
  };
};

function parseSystemConfig(data: GetSystemConfigResponse | undefined) {
  return data
    ? data.reduce(
        (accumulator, { name, value, ...restProps }) =>
          ({
            ...accumulator,
            [name]: {
              ...restProps,
              value:
                name === VALIDATION_SCHEMA_KEY
                  ? escapeAndParse(value).validationSchema
                  : value,
            },
            /* eslint-disable  @typescript-eslint/no-explicit-any */
          }) as Record<string, any>,
        {}
      )
    : {};
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function injectParamsIntoPath(
  path: string,
  params: Record<string, string | number>
) {
  let replacedPath = path;

  Object.keys(params).forEach(name => {
    replacedPath = replacedPath.replace(`{${name}}`, params[name]?.toString());
  });

  return replacedPath;
}

function getInitials(name: string): string {
  if (!name) return "";

  const ignoreWords = new Set(["of", "the", "and", "for", "in", "on", "at"]);
  const nameParts = name
    .split(" ")
    .filter(word => !ignoreWords.has(word.toLowerCase()));

  return nameParts
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}

export {
  canUseIdvt,
  getAbbreviatedListWithCount,
  getInitials,
  getName,
  getShortStatus,
  getSponsor,
  getSponsorshipStatus,
  getStatus,
  injectParamsIntoPath,
  isProduction,
  isSponsorshipStatusApproved,
  parseSystemConfig,
};
