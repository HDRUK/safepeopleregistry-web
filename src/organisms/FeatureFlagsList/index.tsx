"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useColumns from "@/hooks/useColumns";
import useFeatureFlagsQuery from "@/services/feature_flags/useFeatureFlagsQuery";
import { FeatureFlags } from "@/types/features";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import FeatureFlagTable from "../FeatureFlagsTable";
import postFeatureFlagsQuery from "@/services/feature_flags/postFeatureFlagsQuery";

const NAMESPACE_TRANSLATIONS_FEATURES = "FeaturesList";

export default function FeatureFlagList() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_FEATURES);
  const { createDefaultColumn } = useColumns<FeatureFlags>({ t });

  const { refetch, ...query } = useFeatureFlagsQuery();
  const { mutateAsync } = useMutation(postFeatureFlagsQuery());


  const handleToggle = async (
   id: number, value: boolean
  ) => {
    mutateAsync({
      params: {
        id,
      },
      payload: {
        value
      },
    }).then(()=>refetch());
  };


const extraColumns = [
    createDefaultColumn("actions", {
      header: "",
      cell: info => {
        const { value, id } = info.row.original;

        return (
          <ActionMenu>
            {value ? (
              <ActionMenuItem
                onClick={() => {
                  handleToggle(id, false);
                }}>
                {t("disable")}
              </ActionMenuItem>
            ) : (
              <ActionMenuItem
                onClick={() => {
                  handleToggle(id, true);
                }}>
                {t("enable")}
              </ActionMenuItem>
            )}
          </ActionMenu>
        );
      },
    }),
  ];
  return <FeatureFlagTable extraColumns={extraColumns} {...query} t={t} />;
}
