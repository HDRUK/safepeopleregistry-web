import { Status } from "@/consts/application";
import { StatusCategory } from "@/consts/status";
import { statusTooltipSlotProps } from "@/consts/styles";
import { getColorForStatus } from "@/utils/application";
import { Chip, ChipProps, Theme, Tooltip, useTheme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useTranslations } from "next-intl";
import { BoxProps } from "@mui/system";
import Text, { TextProps } from "../Text";

const STATUS_WITH_SHORT_DESCRIPTION = [
  Status.PENDING,
  Status.AFFILIATION_PENDING,
  Status.AFFILIATION_REJECTED,
  Status.AFFILIATION_LEFT,
  Status.AFFILIATION_NEVER_VERIFIED,
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

export interface ChipStatusProps extends BoxProps {
  status: Status | undefined;
  statusCategory?: StatusCategory;
  variant?: "default" | "icon";
  chipProps?: ChipProps;
  textProps?: TextProps;
}

const NAMESPACE_TRANSLATION = "Application.Status";
const NAMESPACE_TRANSLATION_DESCRIPTION = "Application.StatusDescription";

const getColors = (indexColor: string, theme: Theme) => {
  let colors = {
    color: "#fff",
    backgroundColor: theme.palette[`neutral-500`].main,
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
  } else if (indexColor === "primary") {
    colors = {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
    };
  } else if (indexColor === "neutral-light") {
    colors = {
      color: "#000",
      backgroundColor: theme.palette["neutral-100"].main,
    };
  } else if (indexColor === "error") {
    colors = {
      color: "#fff",
      backgroundColor: theme.palette[`${indexColor}-500`].main,
    };
  }

  return colors;
};

export default function ChipStatus({
  status,
  statusCategory,
  variant = "default",
  chipProps,
  textProps,
  ...restProps
}: ChipStatusProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const theme = useTheme();
  const tDescription = useTranslations(NAMESPACE_TRANSLATION_DESCRIPTION);

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

  const descriptionKey = `${statusCategory}.${status}`;
  const description =
    status && statusCategory && tDescription.has(descriptionKey)
      ? tDescription(descriptionKey)
      : undefined;
  const tooltip = description ?? (hasShortTranslation ? t(status) : undefined);
  const tabIndex = tooltip ? 0 : undefined;

  const chip =
    variant === "icon" ? (
      <Text
        variant="small"
        endIcon={
          <CircleIcon
            sx={{
              color: colors.backgroundColor,
            }}
          />
        }
        tabIndex={tabIndex}
        {...textProps}
        {...restProps}>
        {label}
      </Text>
    ) : (
      <Chip
        label={label}
        size="small"
        tabIndex={tabIndex}
        {...chipProps}
        {...restProps}
        sx={{
          ...colors,
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "neutralGrey.contrastText",
            outlineOffset: 2,
          },
          ...(restProps.sx || {}),
        }}
      />
    );

  return tooltip ? (
    <Tooltip
      title={tooltip}
      describeChild={!!description}
      arrow
      slotProps={statusTooltipSlotProps}>
      {chip}
    </Tooltip>
  ) : (
    chip
  );
}
