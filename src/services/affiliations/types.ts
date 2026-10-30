import { ResearcherAffiliation } from "@/types/application";

type GetAffiliationsResponse = ResearcherAffiliation[];
type PostAffiliationsResponse = ResearcherAffiliation;
type PostAffiliationPayload = ResearcherAffiliation;
type PutAffiliationsResponse = ResearcherAffiliation;
type PutAffiliationsPayload = Partial<ResearcherAffiliation>;

interface PutVerifyEmailParams {
  verificationCode: string;
}

interface PutAffiliationEndDateParams {
  affiliationId: number;
}

interface PutAffiliationEndDatePayload {
  // Null removes the end date.
  to: string | null;
}

export enum AffiliationStatus {
  Approved = "approved",
  Rejected = "rejected",
}

export type {
  GetAffiliationsResponse,
  PostAffiliationPayload,
  PostAffiliationsResponse,
  PutAffiliationsPayload,
  PutAffiliationsResponse,
  PutVerifyEmailParams,
  PutAffiliationEndDateParams,
  PutAffiliationEndDatePayload,
};
