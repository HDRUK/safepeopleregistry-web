"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useColumns from "@/hooks/useColumns";
import useFeatureFlagsQuery from "@/services/feature_flags/useFeatureFlagsQuery";
import { FeatureFlags } from "@/types/features";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import putFeatureFlagsQuery from "@/services/feature_flags/putFeatureFlagsQuery";
import FeatureFlagTable from "../FeatureFlagsTable";

const NAMESPACE_TRANSLATIONS_FEATURES = "FeaturesList";

export default function FeatureFlagList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FEATURES);
  const { createDefaultColumn } = useColumns<FeatureFlags>({ t });

  const { refetch, ...query } = useFeatureFlagsQuery();
  const { mutateAsync } = useMutation(putFeatureFlagsQuery());

  const handleToggle = async (id: number) => {
    mutateAsync({
      params: {
        id,
      },
    }).then(() => refetch());
  };

  const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { value, scope, id } = info.row.original;
        const isDisabled = !(scope === '__laravel_null' || scope === null);


        return (
          <ActionMenu>
            <ActionMenuItem onClick={() => handleToggle(id)} disabled={isDisabled}>
              {t(value === "true" ? "disable" : "enable")}
            </ActionMenuItem>
          </ActionMenu>
        );
      },
    }),
  ];
  return <FeatureFlagTable extraColumns={extraColumns} {...query} t={t} />;
}
