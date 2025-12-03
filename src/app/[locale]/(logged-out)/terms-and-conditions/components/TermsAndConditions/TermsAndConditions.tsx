"use client";

import Markdown from "@/components/Markdown";
import PageHeading from "@/components/PageHeading";
import descriptionContent from "@/mocks/data/terms_and_conditions/description.md";
import {
  mockedTermsAndConditionsBusiness,
  mockedTermsAndConditionsConsumer,
} from "@/mocks/data/terms_and_conditions/index";
import { PageBody, PageBodyContainer, PageSection } from "@/modules";
import InfoPageWrapper from "../../../components/InfoPageWrapper";

export default function TermsAndConditions() {
  const sections = {
    consumer: {
      heading: "Consumer Terms and Conditions",
      data: mockedTermsAndConditionsConsumer,
    },
    business: {
      heading: "Business Terms and Conditions",
      data: mockedTermsAndConditionsBusiness,
    },
  };

  return (
    <InfoPageWrapper>
      <PageBodyContainer
        heading="Terms and Conditions"
        sx={{ width: "100%", m: 2, p: 2, background: "white" }}>
        <PageBody>
          <PageSection>
            <Markdown>{descriptionContent}</Markdown>
          </PageSection>
          {Object.entries(sections).map(([key, section]) => (
            <PageSection key={key}>
              <PageHeading heading={section.heading} />
              {Object.values(section.data).map(item => item.content)}
            </PageSection>
          ))}
        </PageBody>
      </PageBodyContainer>
    </InfoPageWrapper>
  );
}
