import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { useStore } from "@/data/store";
import CustodianEditContactForm, {
  CustodianEditContactFormFields,
} from "@/modules/CustodianEditContactForm";
import {
  postCustodianUser,
  postCustodianUserInvite,
  putCustodianUser,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { getPermission } from "@/utils/permissions";
import { getCombinedQueryState } from "@/utils/query";
import { showAlert } from "@/utils/showAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export interface CustodianEditContactModalProps
  extends Omit<FormModalProps, "children"> {
  custodianId: number;
  user: Partial<CustodianUser>;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_PROFILE_FORM = "CustodianProfile.EditContact";

export default function UsersModal({
  custodianId,
  user,
  onClose,
  ...restProps
}: CustodianEditContactModalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE_FORM);
  const permissions = useStore(state => state.config.permissions);
  const queryClient = useQueryClient();

  const { mutateAsync: mutatePostUser, ...updateCustodianUserState } =
    useMutation({
      mutationKey: ["updateCustodianUser"],
      mutationFn: (
        payload: Omit<CustodianUser, "created_at" | "updated_at">
      ) => {
        if (!user?.id) {
          return postCustodianUser(payload, {
            error: { message: "createUserError" },
          });
        }

        return putCustodianUser(user.id, payload, {
          error: { message: "putUserError" },
        });
      },
      onSuccess() {
        queryClient.removeQueries({
          queryKey: ["getCustodianUsers"],
        });
      },
    });

  const {
    mutateAsync: mutateAsyncPostInvite,
    ...postCustodianUserInviteState
  } = useMutation({
    mutationKey: ["postCustodianUserInvite"],
    mutationFn: (id: number) => {
      return postCustodianUserInvite(id, {
        error: { message: "postCustodianUserInviteError" },
      });
    },
  });

  const queryState = getCombinedQueryState([
    postCustodianUserInviteState,
    updateCustodianUserState,
  ]);

  const handleOnSubmit = useCallback(
    async (payload: CustodianEditContactFormFields) => {
      const {
        first_name,
        last_name,
        email,
        permissions: permissionPayload,
      } = payload;

      const userPermissions = [
        getPermission(permissionPayload, permissions)?.id,
      ];

      const userResponse = await mutatePostUser({
        id: user?.id,
        first_name,
        last_name,
        email,
        permissions: userPermissions,
        custodian_id: custodianId,
      });

      if (!user?.id && userResponse?.data) {
        await mutateAsyncPostInvite(userResponse.data);
      }

      onClose();

      showAlert("success", {
        text: user?.id
          ? t("updateSuccessfulDescription")
          : t("createSuccessfulDescription"),
        title: user?.id
          ? t("updateSuccessfulTitle")
          : t("createSuccessfulTitle"),
      });
    },
    [custodianId]
  );

  return (
    <FormModal
      aria-label={`${user.first_name} ${user.last_name} details`}
      variant="content"
      onClose={onClose}
      {...restProps}>
      {queryState.isError && !queryState.isLoading && (
        <Message severity="error">{t(queryState.error[0])}</Message>
      )}
      <CustodianEditContactForm
        onClose={onClose}
        onSubmit={handleOnSubmit}
        user={user}
        queryState={queryState}
        t={t}
      />
    </FormModal>
  );
}
