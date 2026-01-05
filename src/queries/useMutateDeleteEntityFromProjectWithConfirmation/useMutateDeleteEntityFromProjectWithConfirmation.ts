import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { deleteProjectOrganisationQuery } from "@/services/project_organisations";
import { deleteProjectUserQuery } from "@/services/project_users";
import { EntityType } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseMutateDeleteEntityFromProjectProps {
  entityType: Omit<EntityType, "CUSTODIAN">;
  onDelete?: () => void;
}

export default function useMutateDeleteEntityFromProject({
  entityType,
  onDelete,
}: UseMutateDeleteEntityFromProjectProps) {
  const mutation =
    entityType === EntityType.ORGANISATION
      ? deleteProjectOrganisationQuery()
      : deleteProjectUserQuery();

  const { mutateAsync: deleteAsync, ...mutationState } = useMutation(mutation);

  const showConfirm = useQueryConfirmAlerts(mutationState, {
    confirmAlertProps: {
      onConfirm: async payload => {
        await deleteAsync(payload as number);

        onDelete?.();
      },
    },
  });

  return useMemo(
    () => ({
      showConfirm,
      ...mutationState,
    }),
    [mutationState]
  );
}
