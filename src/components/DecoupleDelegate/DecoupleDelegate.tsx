import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import deleteOrganisationDelegate from "@/app/actions/organisations/deleteOrganisationDelegate";
import { TrashIcon } from "../../consts/icons";
import { User } from "../../types/application";
import { ActionMenuItem } from "../ActionMenu";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
  namespace: string;
}

const DecoupleDelegate = ({
  user,
  onSuccess,
  namespace,
}: DecoupleUserProps) => {
  const t = useTranslations(namespace);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, ...mutationState } = useMutation({
    mutationKey: ["deleteOrganisationDelegate", user.id],
    mutationFn: () =>
      deleteOrganisationDelegate(organisation?.id as number, user.id, {
        error: {
          message: "submitError",
        },
      }),
  });

  const { first_name, last_name } = user;
  const { organisation_name } = organisation || {};

  const showConfirm = useQueryConfirmAlerts(mutationState, {
    confirmAlertProps: {
      text: t("alertText", {
        first_name,
        last_name,
        organisation_name,
      }),
      title: t("alertTitle"),
      confirmButtonText: t("alertConfirm"),
      cancelButtonText: t("alertCancel"),
      onConfirm: async () => {
        await mutateAsync();

        onSuccess();
      },
    },
  });

  return (
    <ActionMenuItem
      sx={{ color: "error.main" }}
      onClick={() => showConfirm(undefined)}
      icon={<TrashIcon />}>
      {t("title")}
    </ActionMenuItem>
  );
};

export default DecoupleDelegate;
