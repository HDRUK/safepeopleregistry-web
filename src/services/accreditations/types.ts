import { ResearcherAccreditation } from "@/types/application";

type AccreditationsResponse = ResearcherAccreditation[];

interface Accreditations {
  id: number;
  registry_id: number;
  associated_organisation_name: string | null;
  id_string: string;
  issue_date: string;
  expiry_date: string;
}

interface PostAccreditationsPayload {
  associated_organisation_name: string | null;
  id_string: string;
  issue_date: string;
  expiry_date: string;
}

type PostAccreditationsResponse = number;

type PutAccreditationsPayload = Partial<ResearcherAccreditation>;

type PutAccreditationsResponse = ResearcherAccreditation;

export type {
  AccreditationsResponse,
  Accreditations,
  PostAccreditationsPayload,
  PutAccreditationsPayload,
  PutAccreditationsResponse,
  PostAccreditationsResponse,
};
