import { Status } from "@/consts/application";
import { getColorForStatus } from "@/utils/application";
import { Chip, ChipProps, Theme, Tooltip, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

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

export interface ChipStatusProps extends ChipProps {
  status: Status | undefined;
}

const NAMESPACE_TRANSLATION = "Application.Status";

const getColors = (indexColor: string, theme: Theme) => {
  let colors = {
    color: "#fff",
    backgroundColor: theme.palette[`neutral-400`].main,
  };

  if (indexColor === "warning") {
    colors = {
      color: "#000",
      backgroundColor: theme.palette[`${indexColor}-500`].main,
    };
  } else if (indexColor === "success") {
    colors = {
      color: "#fff",
      backgroundColor: theme.palette[`${indexColor}-700`].main,
    };
  } else if (indexColor === "error") {
    colors = {
      color: "#fff",
      backgroundColor: theme.palette[`${indexColor}-500`].main,
    };
  }

  return colors;
};

export default function ChipStatus({ status, ...restProps }: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const theme = useTheme();

  const indexColor = getColorForStatus(status);
  const colors = getColors(indexColor, theme);

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
        ...colors,
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
