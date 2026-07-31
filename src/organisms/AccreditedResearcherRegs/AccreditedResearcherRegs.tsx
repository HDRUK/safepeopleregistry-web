"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Table from "@/components/Table";
import { formatDBDateTime, formatShortDate } from "@/utils/date";
import {
  deleteAccreditationsQuery,
  getAccreditationsQuery,
  postAccreditationsQuery,
  putAccreditationsQuery,
} from "@/services/accreditations";
import { PostAccreditationsPayload } from "@/services/accreditations/types";
import { EntityType } from "../../types/api";
import { User, Accreditation } from "@/types/application";
import { StoreUserHistories } from "@/data/store";
import { useTranslations } from "next-intl";
import { Button, Link, Typography } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AddIcon } from "@/consts/icons";
import FormModal from "@/components/FormModal";
import { useCallback, useState } from "react";
import AccreditationForm from "./AccreditationForm";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import useQueryAlerts from "@/hooks/useQueryAlerts/useQueryAlerts";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import { ActionMenu } from "@/components/ActionMenu";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";

interface AccreditationsProps {
  variant: EntityType;
  user: User;
  registryId: number;
  setHistories?: (histories: StoreUserHistories) => void;
  getHistories?: () => StoreUserHistories | undefined;
}

const NAMESPACE_TRANSLATION_ACCREDITATIONS =
  "AccreditedResearcherRegistrations";

export default function AccreditedResearcherRegs({
  variant,
  registryId,
  setHistories,
  getHistories,
}: AccreditationsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACCREDITATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccreditation, setSelectedAccreditation] = useState<
    Accreditation | undefined
  >(undefined);

  const {
    data: accreditationsData,
    refetch: refetchAccreditations,
    ...accreditationsQueryState
  } = useQuery({
    ...getAccreditationsQuery(registryId),
  });

  const { mutateAsync, isPending, ...postAccreditationsQueryState } =
    useMutation(postAccreditationsQuery(registryId));

  const { mutateAsync: mutateUpdateAsync, ...putAccreditationsQueryState } =
    useMutation(putAccreditationsQuery(registryId));

  const { mutateAsync: mutateDeleteAsync, ...deleteAccreditationsQueryState } =
    useMutation(deleteAccreditationsQuery(registryId));

  const onSubmit = useCallback(
    async (accreditation: PostAccreditationsPayload) => {
      try {
        const histories = getHistories();
        const updatedHistories = {
          ...histories,
          accreditations: [...histories.accreditations, accreditation],
        };
        if (updatedHistories) {
          setHistories(updatedHistories);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getHistories, setHistories]
  );

  const handleSubmit = useCallback(
    async (accreditation: PostAccreditationsPayload) => {
      const payload = {
        ...accreditation,
        associated_organisation_name:
          accreditation.associated_organisation_name ?? null,
        issue_date: formatDBDateTime(accreditation.issue_date),
        expiry_date: formatDBDateTime(accreditation.expiry_date),
      };

      if (selectedAccreditation) {
        await mutateUpdateAsync({ id: selectedAccreditation.id, ...payload });
      } else {
        await mutateAsync(payload);
      }
      await onSubmit(payload);
      refetchAccreditations();
      handleCloseModal();
    },
    [mutateAsync, mutateUpdateAsync, onSubmit, selectedAccreditation]
  );

  const handleDelete = async (id: number) => {
    showDeleteConfirm(id);
  };

  const renderActions = useCallback(
    (accreditation: Accreditation) => {
      return (
        <ActionMenu
          aria-label={`Actions for ${accreditation.associated_organisation_name}`}>
          <ActionMenuItem
            onClick={() => handleOpenModal(accreditation)}
            sx={{ color: "secondary.main" }}
            icon={<CreateOutlinedIcon sx={{ color: "secondary.main" }} />}>
            {t("viewOrEditAccreditation")}
          </ActionMenuItem>

          <ActionMenuItem
            onClick={() => {
              handleDelete(accreditation.id);
            }}
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {t("deleteAccreditation")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    [registryId, handleDelete]
  );

  const handleOpenModal = useCallback((accreditation?: Accreditation) => {
    setSelectedAccreditation(accreditation);
    setIsModalOpen(true);
  }, []);

  const handleAddAccreditation = useCallback(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccreditation(undefined);
  };

  useQueryAlerts(
    selectedAccreditation
      ? putAccreditationsQueryState
      : postAccreditationsQueryState,
    {
      onSuccess: () => {
        handleCloseModal();
      },
      errorAlertProps: {
        text: (
          <ErrorMessage
            t={t}
            key={
              selectedAccreditation
                ? "updateAccreditationError"
                : "postAccreditationError"
            }
          />
        ),
      },
      successAlertProps: {
        text: selectedAccreditation
          ? t("updateAccreditationSuccess")
          : t("postAccreditationSuccess"),
      },
    }
  );

  const showDeleteConfirm = useQueryConfirmAlerts<number>(
    deleteAccreditationsQueryState,
    {
      onSuccess: () => refetchAccreditations(),
      confirmAlertProps: {
        onConfirm: async id => {
          await mutateDeleteAsync(id as number);
        },
      },
      errorAlertProps: {
        text: <ErrorMessage t={t} tKey="errorDeleteMessage" />,
      },
      successAlertProps: {
        text: t("successDeleteMessage"),
      },
    }
  );

  const columns = [
    {
      header: t("associatedOrganisationName"),
      accessorKey: "associated_organisation_name",
      flex: 1,
    },
    {
      header: t("id"),
      accessorKey: "id_string",
      flex: 1,
    },
    {
      header: t("issueDate"),
      accessorKey: "issue_date",
      flex: 1,
      cell: ({ row }: { row: { original: Accreditation } }) =>
        formatShortDate(row.original.issue_date),
    },
    {
      header: t("expiryDate"),
      accessorKey: "expiry_date",
      flex: 1,
      cell: ({ row }: { row: { original: Accreditation } }) =>
        formatShortDate(row.original.expiry_date),
    },
    ...(variant === EntityType.USER
      ? [
          {
            header: "",
            accessorKey: "actions",
            cell: ({ row }: { row: { original: Accreditation } }) =>
              renderActions(row.original),
          },
        ]
      : []),
  ];

  return (
    <>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t("accreditationTitle")}
      </Typography>
      <Link
        sx={{ display: "block", mb: 1 }}
        href="https://uksa.statisticsauthority.gov.uk/digitaleconomyact-research-statistics/better-useofdata-for-research-information-for-researchers/list-of-accredited-researchers-and-research-projects-under-the-research-strand-of-the-digital-economy-act/">
        {t("publicRegisterLink")}
      </Link>
      <Table
        data={accreditationsData?.data?.data ?? []}
        columns={columns}
        queryState={accreditationsQueryState}
        total={accreditationsData?.data?.data.length ?? 0}
        noResultsMessage={t("noResultsMessage")}
        sx={{ maxWidth: "100%" }}
      />
      {variant === EntityType.USER && (
        <>
          <Button
            onClick={handleAddAccreditation}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}>
            {t("buttonText")}
          </Button>

          <FormModal
            open={isModalOpen}
            heading={
              selectedAccreditation
                ? t("editAccreditation")
                : t("addAccreditation")
            }>
            <AccreditationForm
              onSubmit={handleSubmit}
              isPending={isPending || putAccreditationsQueryState.isPending}
              onCancel={handleCloseModal}
              initialValues={selectedAccreditation}
            />
          </FormModal>
        </>
      )}
    </>
  );
}
