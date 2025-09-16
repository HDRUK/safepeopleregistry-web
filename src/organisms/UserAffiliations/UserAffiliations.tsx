import { AffiliationsTableProps } from "@/modules/AffiliationsTable/AffiliationsTable";
import { EntityType } from "@/types/api";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  AffiliationsTable,
  PageBodyContainer,
  PageSection,
} from "../../modules";
import { usePaginatedAffiliations } from "../../services/affiliations";

const NAMESPACE_TRANSLATION = "Affiliations";

interface UserAffiliationsProps {
  registryId: number;
  variant?: EntityType;
}

export default function UserAffiliations({
  registryId,
  variant,
}: UserAffiliationsProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const {
    data: affiliationsData,
    last_page,
    total,
    setPage,
    ...getAffiliationsQueryState
  } = usePaginatedAffiliations(registryId);

  let tableProps: Partial<AffiliationsTableProps> = {};

  if (variant !== EntityType.USER) {
    tableProps = {
      includeColumns: [
        "warning",
        "date",
        "relationship",
        "organisationName",
        "affiliationStatus",
        "affiliationStatusChangedDate",
      ],
    };
  }

  return (
    <AffiliationsTable
      data={affiliationsData}
      queryState={getAffiliationsQueryState}
      last_page={last_page}
      total={total}
      setPage={setPage}
      t={t}
      {...tableProps}
    />
  );
}
