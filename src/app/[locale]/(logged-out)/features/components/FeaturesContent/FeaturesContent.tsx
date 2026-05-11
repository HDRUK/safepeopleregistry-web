"use client";

import { Typography } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { mockedFeatures } from "@/mocks/data/cms";
import Markdown from "@/components/Markdown";
import Text from "@/components/Text";
import {
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
  PageSection,
} from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";
import FeatureBox from "../../../components/FeatureBox";

export default function FeaturesContent() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer heading={mockedFeatures.infoTitle}>
        <PageColumns>
          <PageColumnBody size={{ lg: 8 }}>
            <PageSection fontSize={18}>
              <Markdown>{mockedFeatures.info}</Markdown>
            </PageSection>
            <Markdown>{mockedFeatures.features}</Markdown>
            <FeatureBox
              StylableIcon={GroupOutlinedIcon}
              title={mockedFeatures.researchersTitle}
              content={mockedFeatures.researchers}
            />
            <FeatureBox
              StylableIcon={LockOutlinedIcon}
              title={mockedFeatures.secureTitle}
              content={mockedFeatures.secure}
            />
            <FeatureBox
              StylableIcon={ChecklistRtlIcon}
              title={mockedFeatures.approvalsTitle}
              content={mockedFeatures.approvals}
            />
            <FeatureBox
              StylableIcon={GppGoodOutlinedIcon}
              title={mockedFeatures.workflowTitle}
              content={mockedFeatures.workflow}
            />
            <FeatureBox
              StylableIcon={BadgeOutlinedIcon}
              title={mockedFeatures.transparencyTitle}
              content={mockedFeatures.transparency}
            />

            <PageSection fontSize={18}>
              <Text fontWeight="bold">{mockedFeatures.footer}</Text>
            </PageSection>
          </PageColumnBody>
          <PageColumnDetails size={{ lg: 4 }}>
            <PageSection
              sx={{
                backgroundColor: "neutralPink.main",
                p: 3,
                gap: 1,
                borderRadius: 3,
              }}>
              <Typography variant="h4">
                {mockedFeatures.detailsTitle}
              </Typography>
              <Markdown>{mockedFeatures.details}</Markdown>
            </PageSection>
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
