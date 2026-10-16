"use client";

import postOrganisationSroInvite from "@/app/actions/organisations/postOrganisationSroInvite";
import postOrganisationSroResendInvite from "@/app/actions/organisations/postOrganisationSroResendInvite";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import useOrganisationStore from "@/queries/useOrganisationStore";
import getOrganisationDelegatesQuery from "@/services/organisations/getOrganisationDelegatesQuery";
import { getUserQuery } from "@/services/users";
import { User } from "@/types/application";
import { getName } from "@/utils/application";
import { AlertProps } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const NAMESPACE_TRANSLATION_ORG_PROFILE = "ProfileOrganisation";

export interface SroInvitee {
  first_name: string;
  last_name: string;
  email: string;
}

// Translation key prefixes. An action's dialog uses <action>ConfirmTitle, <action>ConfirmButton
// and <action>CancelButton; its text uses <text>ConfirmText, or <text>ReplacesPendingConfirmText
// when an SRO invitation is pending.
type ConfirmAction = "sroAppointDelegate" | "sroHandOver" | "sroInvite";
type ConfirmTextPrefix = ConfirmAction | "sroInviteReplacement";

interface ActionOptions {
  onSuccess?: () => void;
}

/**
 * The SRO actions, each confirmed first where it changes someone's role or emails someone,
 * then reported with an alert. Any pending SRO invitee keeps their invitation but joins as a
 * delegate when someone else becomes SRO, so every confirmation says so.
 */
export default function useSroActions() {
  const tOrgProfile = useTranslations(NAMESPACE_TRANSLATION_ORG_PROFILE);
  const { organisation, refetch: refetchOrganisation } = useOrganisationStore();
  const { showAlert, hideAlert } = useAlertModal();

  const { user, setUser } = useStore(state => ({
    user: state.getUser(),
    setUser: state.setUser,
  }));
  const { refetch: refetchUser } = useQuery({
    ...getUserQuery(user?.id as number),
    enabled: false,
  });

  const { data: delegatesData, refetch: refetchDelegates } = useQuery(
    getOrganisationDelegatesQuery(
      organisation?.id as number,
      Boolean(organisation?.id)
    )
  );
  // Only claimed delegates can be appointed; the list also includes invited ones.
  const delegates: User[] = (delegatesData?.data || []).filter(
    delegate => !delegate.unclaimed
  );

  const organisationId = organisation?.id as number;
  const pendingSro = organisation?.pending_sro;

  const showResult = (severity: AlertProps["severity"], text: ReactNode) =>
    showAlert({
      severity,
      text,
      confirmButtonText: tOrgProfile("sroInviteDoneButton"),
      onConfirm: async () => hideAlert(),
    });

  const showError = (tKey: string) =>
    showResult("error", <ErrorMessage t={tOrgProfile} tKey={tKey} />);

  const confirm = ({
    action,
    text = action,
    name,
    onConfirm,
  }: {
    action: ConfirmAction;
    text?: ConfirmTextPrefix;
    name: string;
    onConfirm: () => Promise<void>;
  }) =>
    showAlert({
      severity: "warning",
      title: tOrgProfile(`${action}ConfirmTitle`),
      text: tOrgProfile(
        pendingSro ? `${text}ReplacesPendingConfirmText` : `${text}ConfirmText`,
        {
          name,
          ...(pendingSro && { pendingName: getName(pendingSro) }),
        }
      ),
      confirmButtonText: tOrgProfile(`${action}ConfirmButton`),
      cancelButtonText: tOrgProfile(`${action}CancelButton`),
      onConfirm: async () => {
        hideAlert();
        await onConfirm();
      },
      onCancel: () => hideAlert(),
    });

  // Makes an existing delegate the SRO straight away.
  const appoint = (delegate: User, { onSuccess }: ActionOptions = {}) =>
    confirm({
      action: "sroAppointDelegate",
      name: getName(delegate),
      onConfirm: async () => {
        try {
          await putOrganisationSro(organisationId, delegate.id);
        } catch {
          showError("sroAppointDelegateError");
          return;
        }

        showResult(
          "success",
          tOrgProfile("sroAppointDelegateSuccess", { name: getName(delegate) })
        );
        onSuccess?.();
        await Promise.all([refetchOrganisation(), refetchDelegates()]);
      },
    });

  // The signed-in SRO hands the role to a delegate and becomes a delegate themselves.
  const handOver = (delegate: User, { onSuccess }: ActionOptions = {}) =>
    confirm({
      action: "sroHandOver",
      name: getName(delegate),
      onConfirm: async () => {
        try {
          await putOrganisationSro(organisationId, delegate.id);
        } catch {
          showError("sroHandOverError");
          return;
        }

        showResult(
          "success",
          tOrgProfile("sroHandOverSuccess", { name: getName(delegate) })
        );
        onSuccess?.();

        // The signed-in user is now a delegate, so refresh them as well as the organisation.
        await Promise.all([refetchOrganisation(), refetchDelegates()]);
        const refreshedUser = await refetchUser();

        if (refreshedUser.data?.data) {
          setUser(refreshedUser.data.data);
        }
      },
    });

  // Emails someone new an invitation to become the SRO, or to replace the signed-in SRO.
  const invite = (
    invitee: SroInvitee,
    {
      replacement = false,
      onSuccess,
    }: ActionOptions & { replacement?: boolean } = {}
  ) =>
    confirm({
      action: "sroInvite",
      text: replacement ? "sroInviteReplacement" : "sroInvite",
      name: getName(invitee),
      onConfirm: async () => {
        let response;

        try {
          response = await postOrganisationSroInvite(organisationId, invitee, {
            suppressThrow: true,
          });
        } catch {
          showError("sroInviteError");
          return;
        }

        if (!response.ok) {
          // 409: the email already has an account, so they should be appointed instead.
          showError(
            response.status === 409
              ? "sroInviteExistingAccountError"
              : "sroInviteError"
          );
          return;
        }

        showResult(
          "success",
          tOrgProfile("sroInviteSuccess", { name: getName(invitee) })
        );
        onSuccess?.();
        await refetchOrganisation();
      },
    });

  // Resends the pending SRO invitation with its existing code.
  const resend = async (invitee: User) => {
    let response;

    try {
      response = await postOrganisationSroResendInvite(organisationId, {
        suppressThrow: true,
      });
    } catch {
      response = undefined;
    }

    if (!response?.ok) {
      showError("sroResendInviteError");
      return;
    }

    showResult(
      "success",
      tOrgProfile("sroResendInviteSuccess", { name: getName(invitee) })
    );

    // Updates when the invitation was last sent.
    await refetchOrganisation();
  };

  return { delegates, appoint, handOver, invite, resend };
}
