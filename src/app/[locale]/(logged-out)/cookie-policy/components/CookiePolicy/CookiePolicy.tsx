"use client";

import Markdown from "@/components/Markdown";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";
import cookiePolicyContent from "./cookie_policy.md";

export default function CookiePolicy() {
  return (
    <InfoPageWrapper>
      <PageBodyContainer
        sx={{ width: "100%", m: 2, p: 2, background: "white" }}>
        <PageBody>
          <PageSection fontSize={18} sx={{ p: 2 }}>
            <Markdown>{cookiePolicyContent}</Markdown>
          </PageSection>
        </PageBody>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
