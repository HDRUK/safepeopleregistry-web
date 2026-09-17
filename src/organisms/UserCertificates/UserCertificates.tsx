"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/ErrorMessage";
import Table from "@/components/Table";
import { useAlertModal } from "@/context/AlertModalProvider/AlertModalProvider";
import { useStore } from "@/data/store";
import useFileDownload from "@/hooks/useFileDownload";
import { PageSection } from "@/modules";
import { getTrainingByRegistryIdQuery } from "@/services/trainings";
import { File as ApplicationFile } from "@/types/application";
import { formatShortDate } from "@/utils/date";

const NAMESPACE_TRANSLATION_USER_CERTIFICATES = "UserCertificates";

interface UserCertificateRow {
  id: number;
  name: string;
  awardedAt: string;
  expiresAt: string;
  file: ApplicationFile;
}

export default function UserCertificates() {
  const t = useTranslations(NAMESPACE_TRANSLATION_USER_CERTIFICATES);
  const { showAlert, hideAlert } = useAlertModal();
  const user = useStore(state => state.current.user);

  const { data: trainingsData } = useQuery({
    ...getTrainingByRegistryIdQuery(user?.registry_id as number),
    enabled: !!user?.registry_id,
  });

  const [fileIdToDownload, setFileIdToDownload] = useState<
    number | undefined
  >();
  const { downloadFile: fileDownload } = useFileDownload(fileIdToDownload);

  const downloadFile = useCallback((fileId: number) => {
    setFileIdToDownload(fileId);
  }, []);

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

  const certificates: UserCertificateRow[] = useMemo(
    () =>
      (trainingsData?.data ?? []).reduce<UserCertificateRow[]>(
        (rows, training) => {
          const file = user?.registry?.files?.find(
            f => f.id === training.certification_id
          );
          if (training.certification_id && file) {
            rows.push({
              id: training.id,
              name: training.training_name,
              awardedAt: training.awarded_at,
              expiresAt: training.expires_at,
              file,
            });
          }
          return rows;
        },
        []
      ),
    [trainingsData?.data, user?.registry?.files]
  );

  const columns = [
    {
      header: t("columnName"),
      accessorKey: "name",
    },
    {
      header: t("columnAwardedAt"),
      accessorKey: "awardedAt",
      cell: ({ row }: { row: { original: UserCertificateRow } }) =>
        formatShortDate(row.original.awardedAt),
    },
    {
      header: t("columnExpiresAt"),
      accessorKey: "expiresAt",
      cell: ({ row }: { row: { original: UserCertificateRow } }) =>
        formatShortDate(row.original.expiresAt),
    },
    {
      header: "",
      accessorKey: "download",
      cell: ({ row }: { row: { original: UserCertificateRow } }) => (
        <Button
          onClick={() => downloadFile(row.original.file.id)}
          variant="contained"
          color="primary">
          {t("download")}
        </Button>
      ),
    },
  ];

  return (
    <PageSection>
      <Table
        data={certificates}
        columns={columns}
        noResultsMessage={t("noResultsMessage")}
        sx={{ maxWidth: "100%" }}
      />
    </PageSection>
  );
}
