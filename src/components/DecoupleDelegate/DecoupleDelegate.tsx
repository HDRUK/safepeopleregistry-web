import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { TrashIcon } from "../../consts/icons";
import { PutUserPayload, putUser } from "../../services/users";
import { User } from "../../types/application";
import { ActionMenuItem } from "../ActionMenu";

interface DecoupleUserProps {
  user: User;
  onSuccess: () => void;
  payload: PutUserPayload;
  namespace: string;
}

const DecoupleDelegate = ({
  user,
  onSuccess,
  payload,
  namespace,
}: DecoupleUserProps) => {
  const t = useTranslations(namespace);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, ...mutationState } = useMutation({
    mutationKey: ["putUser"],
    mutationFn: (payload: PutUserPayload) =>
      putUser(user.id, payload, {
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
      onConfirm: async payload => {
        await mutateAsync(payload as User);

        onSuccess();
      },
    },
  });

  return (
    <ActionMenuItem
      sx={{ color: "error.main" }}
      onClick={() => showConfirm(payload)}
      icon={<TrashIcon />}>
      {t("title")}
    </ActionMenuItem>
  );
};

export default DecoupleDelegate;
