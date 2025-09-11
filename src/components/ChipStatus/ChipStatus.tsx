import { Chip, ChipProps, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

export enum Status {
  AFFILIATED = "affiliated",
  PENDING = "pending",
  INVITED = "invited",
  FORM_RECEIVED = "form_received",
  REGISTERED = "registered",
  INVITE_SENT = "invite_sent",
  APPROVED = "approved",
  COMPLETED = "completed",
  PROJECT_APPROVED = "project_approved",
  PROJECT_COMPLETED = "project_completed",
  PROJECT_PENDING = "project_pending",
  PROJECT_IN_PROGRESS = "project_in_progress",
  PROJECT_DECLINED_APPROVAL = "project_declined_approval",
  AFFILIATION_INVITED = "affiliation_invited",
  AFFILIATION_PENDING = "affiliation_pending",
  AFFILIATION_APPROVED = "affiliation_approved",
  AFFILIATION_REJECTED = "affiliation_rejected",
  AFFILIATION_LEFT = "affiliation_left",
  VALIDATION_IN_PROGRESS = "validation_in_progress",
  VALIDATION_COMPLETE = "validation_complete",
  VALIDATED = "validated",
  USER_VALIDATION_DECLINED = "user_validation_declined",
  MORE_USER_INFO_REQ = "more_user_info_req",
  MORE_USER_INFO_REQ_ESCALATION_MANAGER = "more_user_info_req_escalation_manager",
  MORE_USER_INFO_REQ_ESCALATION_COMITTEE = "more_user_info_req_escalation_committee",
  MORE_ORG_INFO_REQ = "more_org_info_req",
  MORE_ORG_INFO_REQ_ESCALATION_MANAGER = "more_org_info_req_escalation_manager",
  MORE_ORG_INFO_REQ_ESCALATION_COMMITTEE = "more_org_info_req_escalation_committee",
  ORG_VALIDATION_DECLINED = "org_validation_declined",
  USER_LEFT_PROJECT = "user_left_project",
  ORG_LEFT_PROJECT = "org_left_project_short",
  NONE = "none",
  ORGANISATION_NOT_VALIDATED = "organisation_not_validated",
  ORGANISATION_VALIDATED = "organisation_validated",
}

const STATUS_WITH_SHORT_DESCRIPTION = [
  Status.PENDING,
  Status.AFFILIATION_PENDING,
  Status.AFFILIATION_REJECTED,
  Status.AFFILIATION_LEFT,
  Status.INVITE_SENT,
  Status.VALIDATION_IN_PROGRESS,
  Status.MORE_ORG_INFO_REQ,
  Status.MORE_ORG_INFO_REQ_ESCALATION_COMMITTEE,
  Status.MORE_ORG_INFO_REQ_ESCALATION_MANAGER,
  Status.USER_VALIDATION_DECLINED,
  Status.USER_LEFT_PROJECT,
  Status.ORG_VALIDATION_DECLINED,
  Status.ORG_LEFT_PROJECT,
  Status.MORE_USER_INFO_REQ_ESCALATION_MANAGER,
  Status.MORE_USER_INFO_REQ_ESCALATION_COMITTEE,
  Status.FORM_RECEIVED,
];

interface ChipStatusProps extends ChipProps {
  status: Status | undefined;
}

const NAMESPACE_TRANSLATION = "Application.Status";

const getColorForStatus = (status?: Status): string => {
  if (
    [
      Status.PROJECT_APPROVED,
      Status.PROJECT_IN_PROGRESS,
      Status.VALIDATION_COMPLETE,
      Status.VALIDATED,
      Status.AFFILIATION_APPROVED,
      Status.ORGANISATION_VALIDATED,
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
    ].includes(status!)
  )
    return "warning";

  return "midGrey";
};

export default function ChipStatus({ status, ...restProps }: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const color = getColorForStatus(status);

  const tooltipKey = `${status}_short`;

  const hasShortTranslation =
    status && STATUS_WITH_SHORT_DESCRIPTION.includes(status);

  let shortTranslation;
  if (hasShortTranslation) {
    shortTranslation = t(tooltipKey);
  }

  const label = status
    ? hasShortTranslation
      ? shortTranslation
      : t(status)
    : t("none");

  const chip = (
    <Chip
      label={label}
      size="small"
      {...restProps}
      sx={{
        backgroundColor: `${color}.main`,
        "& > .MuiChip-label": {
          color: `${color}.contrastText`,
        },
        ...(restProps.sx || {}),
      }}
    />
  );

  return hasShortTranslation ? (
    <Tooltip title={t(status)}>{chip}</Tooltip>
  ) : (
    chip
  );
}
