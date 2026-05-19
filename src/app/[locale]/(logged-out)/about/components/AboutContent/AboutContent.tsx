"use client";

import { Box, Typography } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { mockedAbout } from "@/mocks/data/cms";
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

export default function AboutContent() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer heading={mockedAbout.infoTitle}>
        <PageColumns>
          <PageColumnBody size={{ lg: 8 }}>
            <Text variant="h2">{mockedAbout.aboutTitle}</Text>
            <PageSection fontSize={18}>
              <Markdown>{mockedAbout.about}</Markdown>
            </PageSection>
            <Markdown>{mockedAbout.servingTitle}</Markdown>
            <FeatureBox
              StylableIcon={GroupOutlinedIcon}
              title={mockedAbout.usersTitle}
              content={mockedAbout.users}
            />
            <FeatureBox
              StylableIcon={BusinessOutlinedIcon}
              title={mockedAbout.organisationsTitle}
              content={mockedAbout.organisations}
            />
            <FeatureBox
              StylableIcon={AdminPanelSettingsOutlinedIcon}
              title={mockedAbout.custodiansTitle}
              content={mockedAbout.custodians}
            />

            <PageSection fontSize={18}>
              <Text fontWeight="bold">{mockedAbout.footer}</Text>
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
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h2">{mockedAbout.purposeTitle}</Typography>
                <GppGoodOutlinedIcon style={{ fontSize: 36 }} />
              </Box>
              <Markdown>{mockedAbout.purpose}</Markdown>
              <Box display="flex" alignItems="center" gap={1} pt={2}>
                <Typography variant="h2">
                  {mockedAbout.commitmentTitle}
                </Typography>
                <HandshakeOutlinedIcon style={{ fontSize: 36 }} />
              </Box>
              <Markdown>{mockedAbout.commitment}</Markdown>
            </PageSection>
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
