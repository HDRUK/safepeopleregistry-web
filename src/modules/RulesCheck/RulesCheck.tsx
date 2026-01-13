import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { RuleState } from "../../types/rules";

export interface RulesCheckProps {
  rules: RuleState[];
}

const NAMESPACE_TRANSLATION = "Rules";

const RULE_GROUPS = {
  DataSecurityCompliance: [
    {
      key: "certifications",
      fields: ["ce_certified", "iso_27001_certified"],
    },
    {
      key: "ceCertifiedPlus",
      fields: ["ce_certified_plus"],
    },
    {
      key: "dsptkCertified",
      fields: ["dsptk_certified"],
    },
  ],
};

export default function RulesCheck({ rules }: RulesCheckProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const getPath = ({ failed_rules, conditions }: RuleState) => {
    return failed_rules?.conditions?.path || conditions?.path;
  };

  const getHeading = (item: RuleState) => {
    const { failed_rules, conditions, rule } = item;
    const defaultCondition = failed_rules?.conditions || conditions;

    const description =
      typeof defaultCondition?.expects === "string" && defaultCondition.expects;
    const tKey = `${failed_rules?.rule || rule}.${getPath(item)}`;

    return !t.has(tKey) ? description : t(tKey);
  };

  const getNonGroupedRules = (rules: RuleState[]) => {
    return rules
      .filter(
        ({ failed_rules, rule }) => !RULE_GROUPS[failed_rules?.rule || rule]
      )
      .map(rule => {
        const { failed_rules } = rule;

        return {
          heading: getHeading(rule),
          passed: !failed_rules,
          rules: [rule],
        };
      });
  };

  const getGroupedRules = (rules: RuleState[]) => {
    const items = [];

    Object.keys(RULE_GROUPS).forEach(ruleName => {
      const ruleGroup = RULE_GROUPS[ruleName as keyof typeof RULE_GROUPS];

      ruleGroup.forEach(({ fields, key }) => {
        const heading = t(`${ruleName}.${key}`);
        const pickedRules: RuleState[] = [];

        fields.forEach(field => {
          const currentRule = rules.find(rule => {
            return getPath(rule) === field;
          });

          if (currentRule) pickedRules.push(currentRule);
        });

        items.push({
          heading,
          passed: pickedRules.some(rule => !rule.failed_rules),
          rules: pickedRules,
        });
      });
    });

    return items;
  };

  const formattedRules = useMemo(() => {
    return [...getNonGroupedRules(rules), ...getGroupedRules(rules)];
  }, [rules]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
      }}>
      {formattedRules.map(({ heading, passed }) => {
        return (
          <div key={heading}>
            <Typography fontWeight={600}>{heading}</Typography>
            <Typography
              color={passed !== false ? "success.main" : "error.main"}
              fontWeight={600}>
              {passed !== false ? t("passed") : t("failed")}
            </Typography>
          </div>
        );
      })}
    </Box>
  );
}
