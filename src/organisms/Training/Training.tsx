"use client";

import { StoreUserHistories } from "@/data/store";

import ErrorMessage from "@/components/ErrorMessage";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { ActionMenu, ActionMenuItem } from "../../components/ActionMenu";
import FormModal from "../../components/FormModal";
import Table from "../../components/Table";
import { AddIcon } from "../../consts/icons";
import useFileDownload from "../../hooks/useFileDownload";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import useQueryConfirmAlerts from "../../hooks/useQueryConfirmAlerts";
import {
  deleteTrainingsQuery,
  getTrainingByRegistryIdQuery,
  postTrainingsQuery,
  putTrainingsQuery,
} from "../../services/trainings";
import { PostTrainingsPayload } from "../../services/trainings/types";
import { EntityType } from "../../types/api";
import { ResearcherTraining, User } from "../../types/application";
import { formatDBDateTime, formatShortDate } from "../../utils/date";
import TrainingForm from "./TrainingForm";

const NAMESPACE_TRANSLATION_TRAINING = "Training";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

interface TrainingProps {
  variant: EntityType;
  user: User;
  setHistories?: (histories: StoreUserHistories) => void;
  getHistories?: () => StoreUserHistories | undefined;
}

export default function Training({
  variant,
  user,
  setHistories,
  getHistories,
}: TrainingProps) {
  const { showAlert, hideAlert } = useAlertModal();
  const t = useTranslations(NAMESPACE_TRANSLATION_TRAINING);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<
    ResearcherTraining | undefined
  >(undefined);

  const [fileIdToDownload, setFileIdToDownload] = useState<
    number | undefined
  >();
  const { downloadFile: fileDownload } = useFileDownload(fileIdToDownload);

  const downloadFile = useCallback((fileId: number) => {
    setFileIdToDownload(fileId);
  }, []);

  const handleDelete = async (id: number) => {
    showDeleteConfirm(id);
  };

  const { mutateAsync: mutateUpdateAsync, ...putTrainingsQueryState } =
    useMutation(putTrainingsQuery(selectedTraining?.id));

  const {
    data: trainingsData,
    refetch: refetchTrainings,
    ...trainingDataQueryState
  } = useQuery({
    ...getTrainingByRegistryIdQuery(user?.registry_id),
    enabled: !!user?.registry_id,
  });

  const { mutateAsync, isPending, ...postTrainingsQueryState } = useMutation(
    postTrainingsQuery(user?.registry_id)
  );

  const {
    mutateAsync: mutateDeleteAsync,
    ...deleteProfessionalRegistrationQueryState
  } = useMutation(deleteTrainingsQuery());

  useEffect(() => {
    try {
      if (fileIdToDownload) {
        fileDownload();
        setFileIdToDownload(undefined);
      }
    } catch (_) {
      showAlert({
        severity: "error",
        text: <ErrorMessage t={t} tKey="fileDownloadError" />,
        confirmButtonText: t("errorButton"),
        onConfirm: async () => {
          hideAlert();
        },
      });
    }
  }, [fileIdToDownload, fileDownload]);

  const handleOpenModal = useCallback((training?: ResearcherTraining) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
  }, []);

  const handleAddTraining = useCallback(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTraining(undefined);
  };

  useQueryAlerts(
    selectedTraining ? putTrainingsQueryState : postTrainingsQueryState,
    {
      onSuccess: () => {
        handleCloseModal();
      },
      errorAlertProps: {
        text: (
          <ErrorMessage
            t={t}
            key={selectedTraining ? "updateTrainingError" : "postTrainingError"}
          />
        ),
      },
      successAlertProps: {
        text: selectedTraining
          ? t("updateTrainingSuccess")
          : t("postTrainingSuccess"),
      },
    }
  );

  const showDeleteConfirm = useQueryConfirmAlerts<number>(
    deleteProfessionalRegistrationQueryState,
    {
      onSuccess: () => refetchTrainings(),
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

  const renderActions = useCallback(
    (training: ResearcherTraining) => {
      const certificateFileId = training.certification_id;
      return (
        <ActionMenu aria-label={`Actions for ${training.training_name}`}>
          <ActionMenuItem
            onClick={() => handleOpenModal(training)}
            sx={{ color: "secondary.main" }}
            icon={<CreateOutlinedIcon sx={{ color: "secondary.main" }} />}>
            {tProfile("viewOrEdit")}
          </ActionMenuItem>
          <ActionMenuItem
            icon={<TaskAltIcon sx={{ color: "secondary.main" }} />}
            sx={{ color: "secondary.main" }}
            onClick={() =>
              !!certificateFileId && downloadFile(certificateFileId)
            }
            disabled={!certificateFileId}>
            {t("viewCertificate")}
          </ActionMenuItem>
          <ActionMenuItem
            onClick={() => {
              handleDelete(training.id);
            }}
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {tApplication("delete")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    [user, downloadFile, handleDelete, t, tProfile, tApplication]
  );

  const onSubmit = useCallback(
    async (training: PostTrainingsPayload) => {
      try {
        const histories = getHistories();
        const updatedHistories = {
          ...histories,
          training: [...histories.training, training],
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
    async (training: PostTrainingsPayload) => {
      const payload = {
        ...training,
        awarded_at: formatDBDateTime(training.awarded_at),
        expires_at: formatDBDateTime(training.expires_at),
      };

      if (selectedTraining) {
        // Update existing training
        await mutateUpdateAsync({ id: selectedTraining.id, ...payload });
      } else {
        // Create new training
        await mutateAsync(payload);
        await onSubmit(payload);
      }
      refetchTrainings();
    },
    [mutateAsync, mutateUpdateAsync, onSubmit, selectedTraining]
  );

  const columns = [
    {
      header: t("trainingHistoryColumnProvider"),
      accessorKey: "provider",
    },
    {
      header: t("trainingHistoryColumnName"),
      accessorKey: "training_name",
    },
    {
      header: t("trainingHistoryColumnAwardedAt"),
      accessorKey: "awarded_at",
      cell: ({ row }: { row: { original: ResearcherTraining } }) =>
        formatShortDate(row.original.awarded_at),
    },
    {
      header: t("trainingHistoryColumnExpiresAt"),
      accessorKey: "expires_at",
      cell: ({ row }: { row: { original: ResearcherTraining } }) =>
        formatShortDate(row.original.expires_at),
    },
    ...(variant === EntityType.USER
      ? [
          {
            header: "",
            accessorKey: "actions",
            cell: ({ row }: { row: { original: ResearcherTraining } }) =>
              renderActions(row.original),
          },
        ]
      : []),
  ];
  return (
    <>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t("trainingHistoryTitle")}
      </Typography>
      <Table
        data={trainingsData?.data}
        columns={columns}
        queryState={trainingDataQueryState}
        total={trainingsData?.data.length}
        noResultsMessage={t("noResultsMessage")}
        sx={{ maxWidth: "100%" }}
      />
      {variant === EntityType.USER && (
        <>
          <Button
            onClick={handleAddTraining}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}>
            {t("addTrainingCourse")}
          </Button>

          <FormModal
            open={isModalOpen}
            heading={
              selectedTraining
                ? t("editTrainingCourse")
                : t("addTrainingCourse")
            }>
            <TrainingForm
              onSubmit={handleSubmit}
              isPending={isPending || putTrainingsQueryState.isPending}
              onCancel={handleCloseModal}
              initialValues={selectedTraining}
            />
          </FormModal>
        </>
      )}
    </>
  );
}
