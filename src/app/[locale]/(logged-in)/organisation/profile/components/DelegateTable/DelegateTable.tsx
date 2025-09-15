import { ActionMenu } from "@/components/ActionMenu";
import DecoupleDelegate from "@/components/DecoupleDelegate";
import FormModal from "@/components/FormModal";
import { DEFAULT_STALE_TIME } from "@/consts/requests";
import { useStore } from "@/data/store";
import DelegatesTable from "@/modules/DelegatesTable";
import { getOrganisationDelegatesQuery } from "@/services/organisations";
import { User } from "@/types/application";
import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import EditDelegate from "../EditDelegate";
import InviteDelegateForm from "../InviteDelegateForm";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";
const NAMESPACE_TRANSLATION_LIST = "Organisations.DelegatesList";

const DelegateTable = () => {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tList = useTranslations(NAMESPACE_TRANSLATION_LIST);

  const { organisation } = useStore(state => ({
    organisation: state.config.organisation,
    user: state.getUser(),
  }));

  const {
    refetch: refetchDelegates,
    data: delegatesData,
    ...queryState
  } = useQuery({
    ...getOrganisationDelegatesQuery(
      organisation?.id as number,
      !!organisation
    ),
    staleTime: DEFAULT_STALE_TIME,
  });

  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);

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

  const extraColumns = useMemo(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        cell: renderActions,
      },
    ],
    []
  );

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <DelegatesTable
          data={delegatesData?.data}
          total={delegatesData?.data.length}
          t={tList}
          extraColumns={extraColumns}
          isPaginated={false}
          {...queryState}
        />
      </Box>
      {!queryState.isLoading && (
        <>
          <Button variant="outlined" onClick={() => setOpenInviteModal(true)}>
            {tProfile("inviteAnotherDelegate")}
          </Button>
          <FormModal
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
      )}
    </>
  );
};

export default DelegateTable;
