import FormModal, { FormModalProps } from "@/components/FormModal";
import { Message } from "@/components/Message";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import CustodianEditContactForm from "@/modules/CustodianEditContactForm";
import {
  postCustodianUser,
  postCustodianUserInvite,
  putCustodianUser,
} from "@/services/custodian_users";
import { CustodianUser } from "@/types/application";
import { CustodianEditContactFormFields } from "@/types/form";
import { getPermission } from "@/utils/permissions";
import { getCombinedQueryState } from "@/utils/query";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export interface UserModalProps extends Omit<FormModalProps, "children"> {
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
}: UserModalProps) {
  const { showAlert, hideAlert } = useAlertModal();
  const tForm = useTranslations(NAMESPACE_TRANSLATION_PROFILE_FORM);
  const permissions = useStore(state => state.config.permissions);

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

      showAlert({
        severity: "success",
        text: user?.id
          ? tForm("updateSuccessfulDescription")
          : tForm("createSuccessfulDescription"),
        title: user?.id
          ? tForm("updateSuccessfulTitle")
          : tForm("createSuccessfulTitle"),
        onConfirm: async () => {
          hideAlert();
        },
      });
    },
    [custodianId]
  );

  return (
    <FormModal
      aria-label={`${user} ${user.last_name} details`}
      variant="content"
      onClose={onClose}
      {...restProps}>
      {queryState.isError && !queryState.isLoading && (
        <Message severity="error">{tForm(queryState.error[0])}</Message>
      )}
      <CustodianEditContactForm
        onClose={onClose}
        onSubmit={handleOnSubmit}
        user={user}
        queryState={queryState}
        t={tForm}
      />
    </FormModal>
  );
}
