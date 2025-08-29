"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { StoreUserHistories } from "@/data/store";
import ErrorMessage from "@/components/ErrorMessage";
import ChipStatus, { Status } from "../../components/ChipStatus";
import Table from "../../components/Table";
import { ResearcherAffiliation } from "../../types/application";
import {
  renderAffiliationDateRangeCell,
  renderOrganisationsNameCell,
  renderWarningCell,
} from "../../utils/cells";
import { PaginatedQueryHelpers } from "../../hooks/usePaginatedQuery";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

interface AffiliationsProps {
  setHistories?: (histories: StoreUserHistories) => void;
  getHistories?: () => StoreUserHistories | undefined;
  extraColumns?: ColumnDef<ResearcherAffiliation>[];
  affiliationsData: ResearcherAffiliation[] | undefined;
  getAffiliationsQueryState: Partial<PaginatedQueryHelpers>;
  last_page: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Affiliations({
  setHistories,
  getHistories,
  extraColumns,
  affiliationsData,
  getAffiliationsQueryState,
  last_page,
  total,
  setPage,
}: AffiliationsProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const renderRelationship = (
    info: CellContext<ResearcherAffiliation, unknown>
  ) => {
    const value = info.getValue() as string;
    return value?.length > 0 ? tApplication(info.getValue()) : null;
  };

  const renderStatus = (info: CellContext<ResearcherAffiliation, unknown>) => (
    <ChipStatus status={info.getValue() as Status} color="success" />
  );

  const columns: ColumnDef<ResearcherAffiliation>[] = [
    {
      accessorKey: "warning",
      header: "",
      cell: renderWarningCell,
    },
    {
      accessorKey: "date",
      header: tApplication("period"),
      cell: renderAffiliationDateRangeCell,
    },
    {
      accessorKey: "organisation",
      header: tApplication("organisationName"),
      cell: info => renderOrganisationsNameCell(info.getValue()),
    },
    {
      accessorKey: "relationship",
      header: tApplication("relationship"),
      cell: renderRelationship,
    },
    {
      accessorKey: "member_id",
      header: tApplication("staffStudentId"),
    },
    {
      accessorKey: "model_state.state.slug",
      header: tApplication("affiliationStatus"),
      cell: renderStatus,
    },
    ...(extraColumns ?? []),
  ];

  useEffect(() => {
    const storeHistories = getHistories?.();

    setHistories?.({
      ...storeHistories,
      affiliations: affiliationsData,
    });
  }, [affiliationsData]);

  return (
    <Table
      noResultsMessage={tProfile("affiliationsNoResultsMessage")}
      errorMessage={
        <ErrorMessage t={tProfile} tKey="affiliationsErrorMessage" />
      }
      total={total}
      last_page={last_page}
      setPage={setPage}
      data={affiliationsData || []}
      columns={columns}
      queryState={getAffiliationsQueryState}
      isPaginated
    />
  );
}
