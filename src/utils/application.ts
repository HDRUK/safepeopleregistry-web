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

const getColorForStatus = (status?: Status): string => {
  if (
    [
      Status.PROJECT_APPROVED,
      Status.PROJECT_IN_PROGRESS,
      Status.VALIDATION_COMPLETE,
      Status.VALIDATED,
      Status.AFFILIATION_APPROVED,
      Status.ORGANISATION_VALIDATED,
      Status.REGISTERED,
      Status.ORGANISATION_REGISTERED,
      Status.SPONSORSHIP_APPROVED,
      Status.EMAIL_SUCCESSFUL,
    ].includes(status!)
  )
    return "success";

  if (
    [
      Status.PROJECT_DECLINED_APPROVAL,
      Status.USER_VALIDATION_DECLINED,
      Status.ORG_VALIDATION_DECLINED,
      Status.AFFILIATION_REJECTED,
      Status.ORGANISATION_NOT_VALIDATED,
      Status.SPONSORSHIP_REJECTED,
      Status.EMAIL_FAILED,
    ].includes(status!)
  )
    return "error";

  if (
    [
      Status.PROJECT_PENDING,
      Status.VALIDATION_IN_PROGRESS,
      Status.MORE_USER_INFO_REQ,
      Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER,
      Status.MORE_USER_INFO_REQ_ESCALATION_COMITTEE,
      Status.MORE_ORG_INFO_REQ,
      Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER,
      Status.MORE_ORG_INFO_REQ_ESCALATION_COMMITTEE,
      Status.PENDING,
      Status.AFFILIATION_PENDING,
      Status.SPONSORSHIP_PENDING,
      Status.AFFILIATION_INFO_REQUIRED,
    ].includes(status!)
  )
    return "warning";

  return "neutral";
};

function getStatus(slug: string) {
  switch (slug) {
    case Status.SPONSORSHIP_REJECTED:
      return "Declined";
    case Status.SPONSORSHIP_PENDING:
      return "Pending";
    case Status.SPONSORSHIP_APPROVED:
      return "Confirmed";
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
  getColorForStatus,
};
