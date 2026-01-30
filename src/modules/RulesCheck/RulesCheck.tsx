import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { RuleState } from "../../types/rules";

export interface RulesCheckProps {
  rules: RuleState[];
}

const NAMESPACE_TRANSLATION = "Rules";

export default function RulesCheck({ rules }: RulesCheckProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const getHeading = (item: RuleState) => {
    if (item.failed_rules) {
      const expected = item.failed_rules.conditions?.expects;

      return `${t(`${item.failed_rules.rule}.${item.failed_rules.conditions?.path}`)}${expected && typeof expected === "string" ? `: ${expected}` : ""}`;
    }

    return t(`${item.rule}.${item.conditions.path}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
      }}>
      {rules.map(item => {
        const { status } = item;

        return (
          <div>
            <Typography fontWeight={600}>{getHeading(item)}</Typography>
            <Typography
              color={status ? "success.main" : "error.main"}
              fontWeight={600}>
              {status ? t("passed") : t("failed")}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
}
