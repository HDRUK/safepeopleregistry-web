import Markdown from "@/components/Markdown";

import disclaimersBusinessContent from "./business/10_disclaimers.md";
import suspensionBusinessContent from "./business/11_suspension.md";
import changesBusinessContent from "./business/12_changes.md";
import thirdPartyBusinessContent from "./business/13_third_party.md";
import otherBusinessContent from "./business/14_other.md";
import lawBusinessContent from "./business/15_law.md";
import contactBusinessContent from "./business/16_contact.md";
import understandingBusinessContent from "./business/1_understanding.md";
import researcherUsageBusinessContent from "./business/2_usage_researcher.md";
import organisationUsageBusinessContent from "./business/3_usage_org.md";
import custodianUsageBusinessContent from "./business/4_usage_custodian.md";
import accountBusinessContent from "./business/5_account.md";
import acceptableUseBusinessContent from "./business/6_acceptable_use.md";
import intellectualPropertyBusinessContent from "./business/7_intellectual_property.md";
import inputDataBusinessContent from "./business/8_input_data.md";
import liabilityBusinessContent from "./business/9_liability.md";

import changesConsumerContent from "./consumer/10_changes.md";
import thirdPartyConsumerContent from "./consumer/11_third_party.md";
import otherConsumerContent from "./consumer/12_other.md";
import lawConsumerContent from "./consumer/13_law.md";
import contactConsumerContent from "./consumer/14_contact.md";
import understandingConsumerContent from "./consumer/1_understanding.md";
import researcherUsageConsumerContent from "./consumer/2_usage_researcher.md";
import accountConsumerContent from "./consumer/3_account.md";
import acceptableUseConsumerContent from "./consumer/4_acceptable_use.md";
import intellectualPropertyConsumerContent from "./consumer/5_intellectural_property.md";
import inputDataConsumerContent from "./consumer/6_input_data.md";
import liabilityConsumerContent from "./consumer/7_liability.md";
import useConsumerContent from "./consumer/8_use.md";
import suspensionConsumerContent from "./consumer/9_suspension.md";

export const mockedTermsAndConditionsBusiness = {
  understanding: {
    content: (
      <Markdown variant="legal">{understandingBusinessContent}</Markdown>
    ),
  },
  researcherUsage: {
    content: (
      <Markdown variant="legal">{researcherUsageBusinessContent}</Markdown>
    ),
  },
  organisationUsage: {
    content: (
      <Markdown variant="legal">{organisationUsageBusinessContent}</Markdown>
    ),
  },
  custodianUsage: {
    content: (
      <Markdown variant="legal">{custodianUsageBusinessContent}</Markdown>
    ),
  },
  account: {
    content: <Markdown variant="legal">{accountBusinessContent}</Markdown>,
  },
  acceptableUse: {
    content: (
      <Markdown variant="legal">{acceptableUseBusinessContent}</Markdown>
    ),
  },
  intellectualProperty: {
    content: (
      <Markdown variant="legal">{intellectualPropertyBusinessContent}</Markdown>
    ),
  },
  inputData: {
    content: <Markdown variant="legal">{inputDataBusinessContent}</Markdown>,
  },
  liability: {
    content: <Markdown variant="legal">{liabilityBusinessContent}</Markdown>,
  },
  disclaimers: {
    content: <Markdown variant="legal">{disclaimersBusinessContent}</Markdown>,
  },
  suspension: {
    content: <Markdown variant="legal">{suspensionBusinessContent}</Markdown>,
  },
  changes: {
    content: <Markdown variant="legal">{changesBusinessContent}</Markdown>,
  },
  thirdParty: {
    content: <Markdown variant="legal">{thirdPartyBusinessContent}</Markdown>,
  },
  other: {
    content: <Markdown variant="legal">{otherBusinessContent}</Markdown>,
  },
  law: {
    content: <Markdown variant="legal">{lawBusinessContent}</Markdown>,
  },
  contact: {
    content: <Markdown variant="legal">{contactBusinessContent}</Markdown>,
  },
};

export const mockedTermsAndConditionsConsumer = {
  understanding: {
    content: (
      <Markdown variant="legal">{understandingConsumerContent}</Markdown>
    ),
  },
  researcherUsage: {
    content: (
      <Markdown variant="legal">{researcherUsageConsumerContent}</Markdown>
    ),
  },
  account: {
    content: <Markdown variant="legal">{accountConsumerContent}</Markdown>,
  },
  acceptableUse: {
    content: (
      <Markdown variant="legal">{acceptableUseConsumerContent}</Markdown>
    ),
  },
  intellectualProperty: {
    content: (
      <Markdown variant="legal">{intellectualPropertyConsumerContent}</Markdown>
    ),
  },
  inputData: {
    content: <Markdown variant="legal">{inputDataConsumerContent}</Markdown>,
  },
  liability: {
    content: <Markdown variant="legal">{liabilityConsumerContent}</Markdown>,
  },
  use: {
    content: <Markdown variant="legal">{useConsumerContent}</Markdown>,
  },
  suspension: {
    content: <Markdown variant="legal">{suspensionConsumerContent}</Markdown>,
  },
  changes: {
    content: <Markdown variant="legal">{changesConsumerContent}</Markdown>,
  },
  thirdParty: {
    content: <Markdown variant="legal">{thirdPartyConsumerContent}</Markdown>,
  },
  other: {
    content: <Markdown variant="legal">{otherConsumerContent}</Markdown>,
  },
  law: {
    content: <Markdown variant="legal">{lawConsumerContent}</Markdown>,
  },
  contact: {
    content: <Markdown variant="legal">{contactConsumerContent}</Markdown>,
  },
};
