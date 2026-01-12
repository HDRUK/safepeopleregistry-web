import { ActionMenu } from "@/components/ActionMenu";
import DecoupleDelegate from "@/components/DecoupleDelegate";
import ErrorMessage from "@/components/ErrorMessage";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import { PageSection } from "@/modules";
import { UsersResponse } from "@/services/users";
import { User } from "@/types/application";
import { ResponseJson } from "@/types/requests";
import { getName } from "@/utils/application";
import { formatShortDate } from "@/utils/date";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Button } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useState } from "react";
import EditDelegate from "../EditDelegate";
import InviteDelegateForm from "../InviteDelegateForm";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

const DelegateTable = ({
  refetch,
  data,
  isLoading,
  isError,
}: UseQueryResult<ResponseJson<UsersResponse>, Error>) => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);

  const renderAccountCreated = (info: CellContext<User, unknown>) =>
    info.getValue() ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TaskAltIcon color="success" />
      </Box>
    );

  const renderActions = (info: CellContext<User, unknown>) => (
    <ActionMenu>
      <EditDelegate user={info.row.original} onSuccess={refetch} />
      <DecoupleDelegate
        user={info.row.original}
        onSuccess={refetch}
        payload={{ is_delegate: 0 }}
        namespace="DecoupleDelegates"
      />
    </ActionMenu>
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Full Name",
      cell: info => getName(info.row.original),
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
    <>
      <PageSection>
        <Table
          total={data?.data.length}
          data={data?.data || []}
          columns={columns}
          errorMessage={<ErrorMessage t={tProfile} tKey="getDelegatesError" />}
          queryState={{
            isLoading,
            isError: isError || data === undefined,
          }}
        />
      </PageSection>
      <PageSection>
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
              refetch();
            }}
          />
        </FormModal>
      </PageSection>
    </>
  );
};

export default DelegateTable;
