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
import { deleteSubsidiaryQuery } from "@/services/subsidiaries";
import { Subsidiary } from "@/types/application";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useMutationUpdateSubsidiary from "../../queries/useMutationUpdateSubsidiary";

const NAMESPACE_TRANSLATION = "Organisations.Subsidiaries";

interface OrganisationsSubsidiariesProps {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
}

export default function OrganisationsSubsidiaries({
  onDeleteSuccess,
  onEditSuccess,
}: OrganisationsSubsidiariesProps) {
  const organisation = useStore(state => state.config.organisation);
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const [activeSubsidiary, setActiveSubsidiary] = useState<Subsidiary>();

  const { mutateAsync: mutateUpdateAsync, ...restUpdateState } =
    useMutationUpdateSubsidiary();

  const { showConfirm } = useMutationWithConfirmation(deleteSubsidiaryQuery(), {
    onSuccess: () => {
      onDeleteSuccess?.();
    },
  });

  useQueryAlerts(restUpdateState, {
    onSuccess: () => {
      setActiveSubsidiary(undefined);

      onEditSuccess?.();
    },
  });

  return (
    <>
      <PageSection
        heading={t("heading")}
        description="If your Organisation is based internationally, please add any
            UK-based subsidiaries below.">
        <div>
          <OrganisationsSubsidiariesTable
            data={organisation?.subsidiaries || []}
            t={t}
            isPaginated={false}
            onEdit={subsidiary => setActiveSubsidiary(subsidiary)}
            onDelete={subsidiary =>
              showConfirm({
                params: {
                  subsidiaryId: subsidiary.id,
                  organisationId: organisation.id,
                },
              })
            }
          />
          <Button
            variant="outlined"
            onClick={() => setActiveSubsidiary({})}
            sx={{ mt: 2 }}>
            {t("addSubsidiaryButton")}
          </Button>
        </div>
      </PageSection>
      <FormModal
        open={!!activeSubsidiary}
        heading={activeSubsidiary?.id ? "Edit subsidiary" : "Add subsidiary"}>
        <OrganisationsSubsidiaryEditForm
          t={t}
          mutateState={restUpdateState}
          defaultValues={activeSubsidiary}
          onCancel={() => setActiveSubsidiary(undefined)}
          onSubmit={(payload: Subsidiary | Partial<Subsidiary>) => {
            mutateUpdateAsync({
              payload,
              params: {
                organisationId: organisation.id,
                subsidiaryId: activeSubsidiary.id,
              },
            });
          }}
        />
      </FormModal>
    </>
  );
}
