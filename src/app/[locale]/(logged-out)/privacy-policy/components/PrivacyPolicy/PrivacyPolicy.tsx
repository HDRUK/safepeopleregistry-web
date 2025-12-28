"use client";

import Markdown from "@/components/Markdown";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";
import privacyPolicyContent from "./privacy_policy.md";

export default function PrivaryPolicy() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer
        sx={{ width: "100%", m: 2, p: 2, background: "white" }}>
        <PageBody>
          <PageSection fontSize={18} sx={{ p: 2 }}>
            <Markdown>{privacyPolicyContent}</Markdown>
          </PageSection>
        </PageBody>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
