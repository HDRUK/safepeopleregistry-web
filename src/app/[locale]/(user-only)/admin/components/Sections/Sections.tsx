"use client";

import { JOB_DELAY } from "@/consts/application";
import { useStore } from "@/data/store";
import InviteUser from "@/modules/InviteUser";
import SendInviteCustodian from "@/modules/SendInviteCustodian";
import ButtonCancel from "@/components/ButtonCancel";
import FormModal from "@/components/FormModal";
import { PageBody } from "@/modules";
import {
  OrganisationsList,
  InvitesList,
  EmailsList,
  SuperAdminList,
} from "@/organisms";
import FeatureFlagList from "@/organisms/FeatureFlagsList";
import { EntityType } from "@/types/api";
import { Box, Button } from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  AdminSubTabs,
  AdminModalActions,
} from "@/app/[locale]/(logged-in)/user/profile/consts/tabs";
import SubTabs from "@/modules/SubTabs";
import { useState } from "react";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

export default function Sections() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);
  const queryClient = useQueryClient();
  const user = useStore(state => state.getUser());

  const [currentSubTab, setCurrentSubTab] = useState<AdminSubTabs | null>(
    AdminSubTabs.DATA_CUSTODIAN_INVITATION
  );

  const [openModal, setOpenModal] = useState<AdminModalActions | null>(null);

  const subTabs = [
    {
      label: t("invites"),
      value: AdminSubTabs.DATA_CUSTODIAN_INVITATION,
      component: <InvitesList />,
    },
    {
      label: t("organisations"),
      value: AdminSubTabs.ORGANISATIONS,
      component: <OrganisationsList />,
    },
    {
      label: t("featureFlags"),
      value: AdminSubTabs.FEATURE_FLAGS,
      component: <FeatureFlagList />,
    },

    {
      label: t("emailLogs"),
      value: AdminSubTabs.EMAIL_LOGS,
      component: (
        <PageBody data-cy="emails-list">
          <EmailsList />
        </PageBody>
      ),
    },
    {
      label: t("superAdminList"),
      value: AdminSubTabs.SUPER_ADMIN_LIST,
      component: <SuperAdminList />,
    },
  ];

  const handleInviteSuccess = () => {
    setTimeout(() => {
      queryClient.refetchQueries({
        predicate: query =>
          ["getPendingInvites", "getEmails"].some(key =>
            query.queryKey.includes(key)
          ),
      });
    }, JOB_DELAY);
  };

  const modals = [
    {
      label: t("inviteCustodian"),
      value: AdminModalActions.INVITE_CUSTODIAN,
      heading: t("inviteCustodianModalHeading"),
      component: (
        <SendInviteCustodian
          onSuccess={handleInviteSuccess}
          actions={<ButtonCancel onClick={() => setOpenModal(null)} />}
        />
      ),
    },
    {
      label: t("inviteUser"),
      value: AdminModalActions.INVITE_USER,
      heading: t("inviteUserModalHeading"),
      component: (
        <InviteUser
          entityId={user.id}
          entityType={EntityType.ADMIN}
          onSuccess={handleInviteSuccess}
          combinedSuccess={false}
          actions={<ButtonCancel onClick={() => setOpenModal(null)} />}
        />
      ),
    },
  ];

  const selectedSubTab = subTabs.find(tab => tab.value === currentSubTab);

  return (
    <>
      <SubTabs
        tabs={subTabs.map(({ label, value }) => ({ label, value }))}
        current={currentSubTab}
        onChange={(_, value) => setCurrentSubTab(value)}
      />

      {modals.map(({ label, value }) => (
        <Box sx={{ display: "inline-block", mr: 1, mb: 1 }} key={value}>
          <Button key={value} onClick={() => setOpenModal(value)}>
            {label}
          </Button>
        </Box>
      ))}

      {selectedSubTab?.component}

      {modals.map(({ value, heading, component }) => (
        <FormModal
          key={value}
          heading={heading}
          open={openModal === value}
          onClose={() => setOpenModal(null)}>
          {component}
        </FormModal>
      ))}
    </>
  );
}
