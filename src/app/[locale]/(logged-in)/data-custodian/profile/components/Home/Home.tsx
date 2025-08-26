"use client";

import SoursdCard from "@/components/SoursdCard";
import Text from "@/components/Text";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import ActionLogs from "@/organisms/ActionLogs";
import { Custodian } from "@/types/application";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export interface DetailsFormValues {
  name: string;
  contact_email: string;
}

export interface HomeProps {
  custodian: Custodian;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function Home({ custodian }: HomeProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t("home")}>
      <PageColumns>
        <PageColumnBody lg={8}>
          <PageSection>
            <Typography sx={{ mb: 4 }}>{t("homeIntro")}</Typography>
            <ActionLogs
              variant="custodian"
              panelProps={{
                heading: t("homeTitle"),
              }}
            />
          </PageSection>
        </PageColumnBody>
        <PageColumnDetails lg={4}>
          <SoursdCard
            name={custodian.name}
            status={custodian.model_state?.state.slug}
            identifier={custodian.unique_identifier}
            description={t("uniqueIdentifierCaption")}>
            {custodian.client_id && (
              <div>
                <Typography fontWeight={700}>Client id:</Typography>
                <Text copyable>{custodian.client_id}</Text>
              </div>
            )}
          </SoursdCard>
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}
