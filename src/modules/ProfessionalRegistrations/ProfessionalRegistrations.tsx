"use client";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ContactLink from "@/components/ContactLink";
import { StoreUserHistories, useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import useMutationUpdateProfessionalRegistration from "@/queries/useMutationUpdateProfessionalRegistration";
import {
  deleteProfessionalRegistrationQuery,
  getProfessionalRegistrationsQuery,
  putProfessionalRegistrationQuery,
} from "@/services/professional_registrations";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import { ResearcherProfessionalRegistration, User } from "@/types/application";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import Table from "@/components/Table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { ColumnDef } from "@tanstack/react-table";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { EntityType } from "@/types/api";
import ProfessionalRegistrationsFormModal from "./ProfessionalRegistrationsFormModal";

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

interface ProfessionalRegistrationsProps {
  variant: EntityType;
  user: User;
  setHistories?: (histories: StoreUserHistories) => void;
  getHistories?: () => StoreUserHistories | undefined;
  professionalRegistrations: ResearcherProfessionalRegistration[];
}

export default function ProfessionalRegistrations({
  variant,
  user,
  setHistories,
  getHistories,
  professionalRegistrations,
}: ProfessionalRegistrationsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<
    ResearcherProfessionalRegistration | undefined
  >(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const {
    data: professionalRegistrationsData,
    refetch,
    ...getProfessionalRegistrationsQueryState
  } = useQuery(getProfessionalRegistrationsQuery(user?.registry_id));

  const {
    mutateAsync,
    reset: resetPost,
    ...postProfessionalRegistrationQueryState
  } = useMutationUpdateProfessionalRegistration(user?.registry_id);

  const {
    mutateAsync: mutateDeleteAsync,
    ...deleteProfessionalRegistrationQueryState
  } = useMutation(deleteProfessionalRegistrationQuery());

  const {
    mutateAsync: mutatePutAsync,
    ...putProfessionalRegistrationQueryState
  } = useMutation(putProfessionalRegistrationQuery(user?.registry_id));

  useQueryAlerts(
    isEditMode
      ? putProfessionalRegistrationQueryState
      : postProfessionalRegistrationQueryState,
    {
      commonAlertProps: {
        willClose: () => {
          if (!isEditMode) {
            resetPost();
          }
          setIsModalOpen(false);
          setEditRecord(undefined);
          setIsEditMode(false);
        },
      },
      errorAlertProps: {
        text: isEditMode
          ? ReactDOMServer.renderToString(
              tProfile.rich("errorPutMessage", {
                contactLink: ContactLink,
              })
            )
          : ReactDOMServer.renderToString(
              tProfile.rich("errorCreateMessage", {
                contactLink: ContactLink,
              })
            ),
      },
      successAlertProps: {
        text: isEditMode
          ? tProfile("successEditMessage")
          : tProfile("successCreateMessage"),
      },
    }
  );

  const showDeleteConfirm = useQueryConfirmAlerts<number>(
    deleteProfessionalRegistrationQueryState,
    {
      confirmAlertProps: {
        willClose: async (id: number) => {
          await mutateDeleteAsync(id);
          refetch();
        },
      },
      errorAlertProps: {
        text: ReactDOMServer.renderToString(
          tProfile.rich("errorDeleteMessage", {
            contactLink: ContactLink,
          })
        ),
      },
      successAlertProps: {
        text: tProfile("successDeleteMessage"),
      },
    }
  );

  const handleDetailsSubmit = useCallback(
    async (
      fields: PostProfessionalRegistrationPayload &
        ResearcherProfessionalRegistration
    ) => {
      if (isEditMode) {
        await mutatePutAsync({
          id: editRecord!.id,
          member_id: fields.member_id,
          name: fields.name,
        });
      } else {
        await mutateAsync(fields);
      }
      await refetch();
      setIsModalOpen(false);
      setEditRecord(undefined);
      setIsEditMode(false);
    },
    [isEditMode, editRecord, mutatePutAsync, mutateAsync, refetch]
  );

  const handleDelete = async (id: number) => {
    showDeleteConfirm(id);
  };

  const data = professionalRegistrationsData?.data?.data;

  useEffect(() => {
    if (data) {
      const storeHistories = getHistories();
      setHistories({
        ...storeHistories,
        professionalRegistrations: data,
      });
    }
  }, [data, getHistories, setHistories]);

  const columns = useMemo<ColumnDef<ResearcherProfessionalRegistration>[]>(
    () => [
      {
        accessorKey: "name",
        header: tProfile("name"),
        cell: info => info.getValue(),
      },
      {
        accessorKey: "member_id",
        header: tProfile("id"),
        cell: info => info.getValue(),
      },
      ...(variant === EntityType.USER
        ? [
            {
              id: "actions",
              cell: ({ row }) => (
                <ActionMenu aria-label={`Action for ${row.original.name}`}>
                  <ActionMenuItem
                    onClick={() => {
                      setEditRecord(row.original);
                      setIsEditMode(true);
                      setIsModalOpen(true);
                    }}
                    sx={{ color: "menuList1.main" }}
                    icon={
                      <CreateOutlinedIcon sx={{ color: "menuList1.main" }} />
                    }>
                    {tApplication("edit")}
                  </ActionMenuItem>
                  <ActionMenuItem
                    onClick={() => {
                      handleDelete(row.original.id);
                    }}
                    sx={{ color: "error.main" }}
                    icon={
                      <DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />
                    }>
                    {tApplication("delete")}
                  </ActionMenuItem>
                </ActionMenu>
              ),
            },
          ]
        : []),
    ],
    [tProfile, tApplication, handleDelete]
  );
  return (
    <>
      <ProfessionalRegistrationsFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditRecord(undefined);
          setIsEditMode(false);
        }}
        onSubmit={handleDetailsSubmit}
        queryState={
          isEditMode
            ? putProfessionalRegistrationQueryState
            : postProfessionalRegistrationQueryState
        }
        initialValues={editRecord}
        isEdit={isEditMode}
      />
      <Typography variant="h6" sx={{ mb: 1 }}>
        {tProfile("resultsTitle")}
      </Typography>
      <Table
        columns={columns}
        data={professionalRegistrations}
        queryState={getProfessionalRegistrationsQueryState}
        noResultsMessage={tProfile("professionalRegistrationsNoResultsMessage")}
        errorMessage={tProfile.rich("professionalRegsitrationsErrorMessage", {
          contactLink: ContactLink,
        })}
        total={professionalRegistrations.length}
        sx={{ maxWidth: "50%" }}
      />
      {variant === EntityType.USER && (
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          color="primary"
          onClick={() => {
            setEditRecord(undefined);
            setIsEditMode(false);
            setIsModalOpen(true);
          }}
          sx={{ mt: 2 }}>
          {tProfile("addProfessionalRegistration")}
        </Button>
      )}
    </>
  );
}
