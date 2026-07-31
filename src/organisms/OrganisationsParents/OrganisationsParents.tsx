"use client";

import { useStore } from "@/data/store";
import { PageSection } from "@/modules";
import { useTranslations } from "next-intl";
import { useState } from "react";

import FormModal from "@/components/FormModal";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import OrganisationsSubsidiaryEditForm from "@/modules/OrganisationsSubsidiariesEditForm";
import OrganisationsSubsidiariesTable from "@/modules/OrganisationsSubsidiariesTable";
import useMutationWithConfirmation from "@/queries/useMutationWithConfirmation";
import { Subsidiary } from "@/types/application";
import Button from "@mui/material/Button";
import { deleteSubsidiaryQuery } from "@/services/subsidiaries";
import useMutationUpdateSubsidiary from "../../queries/useMutationUpdateSubsidiary";

const NAMESPACE_TRANSLATION = "Organisations.Parents";

interface OrganisationsParentsProps {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
}

export default function OrganisationsParents({
  onDeleteSuccess,
  onEditSuccess,
}: OrganisationsParentsProps) {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [activeParent, setActiveParent] = useState<Subsidiary>();

  const { mutateAsync: mutateUpdateAysnc, ...restUpdateState } =
    useMutationUpdateSubsidiary();

  const { showConfirm } = useMutationWithConfirmation(deleteSubsidiaryQuery(), {
    onSuccess: () => {
      onDeleteSuccess?.();
    },
  });

  useQueryAlerts(restUpdateState, {
    onSuccess: () => {
      setActiveParent(undefined);
      onEditSuccess?.();
    },
  });

  const parents = organisation?.subsidiaries?.filter(s => s.is_parent) ?? [];

  return (
    <>
      <PageSection heading={t("heading")} description={t("description")}>
        <div>
          <OrganisationsSubsidiariesTable
            data={parents}
            t={t}
            isPaginated={false}
            onEdit={parent => setActiveParent(parent)}
            onDelete={parent =>
              showConfirm({
                params: {
                  subsidiaryId: parent.id,
                  organisationId: organisation.id,
                  isParent: true,
                },
              })
            }
          />
        </div>
        <Button
          variant="outlined"
          onClick={() => setActiveParent({})}
          sx={{ mt: 2 }}>
          {t("addParentButton")}
        </Button>
      </PageSection>
      <FormModal
        open={!!activeParent}
        heading={activeParent?.id ? t("edit") : t("add")}>
        <OrganisationsSubsidiaryEditForm
          t={t}
          mutateState={restUpdateState}
          defaultValues={activeParent}
          onCancel={() => setActiveParent(undefined)}
          onSubmit={(payload: Subsidiary | Partial<Subsidiary>) => {
            mutateUpdateAysnc({
              payload: { ...payload, is_parent: true },
              params: {
                organisationId: organisation.id,
                subsidiaryId: activeParent?.id,
              },
            });
          }}
        />
      </FormModal>
    </>
  );
}
