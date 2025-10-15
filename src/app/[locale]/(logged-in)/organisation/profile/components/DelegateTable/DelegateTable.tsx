import Table from "@/components/Table";
import { getOrganisationDelegatesQuery } from "@/services/organisations";
import { useQuery } from "@tanstack/react-query";
import { formatShortDate } from "@/utils/date";
import { User } from "@/types/application";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DecoupleDelegate from "@/components/DecoupleDelegate";
import { useTranslations } from "next-intl";
import { ActionMenu } from "@/components/ActionMenu";
import ErrorMessage from "@/components/ErrorMessage";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import EditDelegate from "../EditDelegate";
import InviteDelegateForm from "../InviteDelegateForm";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const DelegateTable = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const { organisation } = useStore(state => ({
    organisation: state.config.organisation,
    user: state.getUser(),
  }));

  const {
    isLoading: isLoadingDelegates,
    isError: isErrorDelegates,
    data: delegatesData,
    refetch: refetchDelegates,
  } = useQuery({
    ...getOrganisationDelegatesQuery(
      organisation?.id as number,
      !!organisation
    ),
    staleTime: DEFAULT_STALE_TIME,
  });

  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);

  const renderAccountCreated = (info: CellContext<User, unknown>) =>
    info.getValue() ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TaskAltIcon color="success" />
      </Box>
    );

  const renderActions = (info: CellContext<User, unknown>) => (
    <ActionMenu>
      <EditDelegate user={info.row.original} onSuccess={refetchDelegates} />
      <DecoupleDelegate
        user={info.row.original}
        onSuccess={refetchDelegates}
        payload={{ is_delegate: 0 }}
        namespace="DecoupleDelegates"
      />
    </ActionMenu>
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
      cell: info =>
        `${info.row.original.first_name} ${info.row.original.last_name}`,
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: info => info?.row?.original?.departments?.[0]?.name,
    },
    {
      accessorKey: "created_at",
      header: "Invited On",
      cell: info => formatShortDate(info.getValue() as string),
    },
    {
      accessorKey: "unclaimed",
      header: "Account created",
      cell: renderAccountCreated,
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: renderActions,
    },
  ];

  return (
    <LoadingWrapper variant="basic" loading={isLoadingDelegates}>
      <Table
        total={delegatesData?.data.length}
        data={delegatesData?.data || []}
        columns={columns}
        errorMessage={<ErrorMessage t={tProfile} tKey="getDelegatesError" />}
        queryState={{
          isLoading: isLoadingDelegates,
          isError: isErrorDelegates || delegatesData === undefined,
        }}
      />
      <>
        <Button variant="outlined" onClick={() => setOpenInviteModal(true)}>
          {tProfile("inviteAnotherDelegate")}
        </Button>
        <FormModal
          heading={tProfile("InviteDelegate.heading")}
          open={openInviteModal}
          onClose={() => setOpenInviteModal(false)}>
          <InviteDelegateForm
            onCancel={() => setOpenInviteModal(false)}
            onSuccess={() => {
              setOpenInviteModal(false);
              refetchDelegates();
            }}
          />
        </FormModal>
      </>
    </LoadingWrapper>
  );
};

export default DelegateTable;
