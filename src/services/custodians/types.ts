import { EMAIL_TEMPLATE } from "@/consts/application";
import {
  Custodian,
  CustodianUser,
  ModelState,
  Organisation,
  ResearcherProject,
  User,
} from "@/types/application";

interface GetCustodianInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: boolean;
}

interface SendCustodianInvitePayload {
  to: number;
}

interface SendCustodianInviteResponse {
  message: string;
  data: object;
}

interface GetCustodianEntityModelResponse {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  entity_model_type_id: number;
  calls_file: boolean;
  calls_operation: boolean;
  active: number;
}

interface GetCustodianStatusResponse {
  validation_state: ModelState;
  project_status: ModelState;
  organisation_status: ModelState;
  affiliation_status: ModelState;
}

interface PutCustodianActiveEntityModelPayload {
  configs: Array<PutCustodianActiveEntityModelResponse>;
}

interface PutCustodianActiveEntityModelResponse {
  entity_model_id: number;
  active: boolean;
}

type GetCustodianResponse = Custodian;
type GetCustodiansResponse = Custodian[];

type PutCustodianPayload = Partial<Custodian>;
type PutCustodianResponse = Custodian;

type GetCustodiansUserProjectsResponse = ResearcherProject[];

interface PostCustodianInviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  identifier?: EMAIL_TEMPLATE;
}

type PostCustodianInviteUserResponse = number;

type PostCustodianPayload = Custodian;
type PostCustodianResponse = number;
type PostCustodianInviteResponse = Custodian;

type GetCustodianOrganisationsResponse = Organisation[];

type GetCustodianOrganisationUsersResponse = User[];

type GetCustodianUsersResponse = CustodianUser[];

type EntityType =
  | "decision_models"
  | "user_validation_rules"
  | "org_validation_rules";

type PostCustodianProjectResponse = number;
type PostCustodianProjectPayload = ResearcherProject;

export type {
  PostCustodianInviteUserPayload,
  PostCustodianInviteUserResponse,
  GetCustodianInviteResponse,
  GetCustodianResponse,
  GetCustodiansResponse,
  SendCustodianInvitePayload,
  SendCustodianInviteResponse,
  PutCustodianPayload,
  PutCustodianResponse,
  PostCustodianPayload,
  PostCustodianResponse,
  PostCustodianInviteResponse,
  EntityType,
  GetCustodianEntityModelResponse,
  PutCustodianActiveEntityModelPayload,
  PutCustodianActiveEntityModelResponse,
  GetCustodiansUserProjectsResponse,
  GetCustodianOrganisationsResponse,
  GetCustodianOrganisationUsersResponse,
  GetCustodianUsersResponse,
  PostCustodianProjectResponse,
  PostCustodianProjectPayload,
  GetCustodianStatusResponse,
};
