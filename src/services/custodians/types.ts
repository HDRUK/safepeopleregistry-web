import { EMAIL_TEMPLATE } from "@/consts/application";
import {
  Custodian,
  CustodianUser,
  ModelState,
  Organisation,
  ResearcherAffiliation,
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

interface GetCustodianDecisionModelResponse {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  decision_model_type_id: number;
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

interface PutCustodianActiveDecisionModelPayload {
  configs: Array<PutCustodianActiveDecisionModelResponse>;
}

interface PutCustodianActiveDecisionModelResponse {
  decision_model_id: number;
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

// A user who left a project when their affiliation ended, whose real data access
// the Custodian must confirm revoking.
interface CustodianAccessRevocation {
  id: number;
  custodian_id: number;
  project_has_user_id: number;
  access_revocation_required_at: string;
  access_revocation_reminded_at: string | null;
  project_has_user: {
    id: number;
    project: Pick<ResearcherProject, "id" | "title">;
    registry: {
      id: number;
      user: Pick<User, "id" | "first_name" | "last_name" | "email">;
    };
    affiliation: Pick<
      ResearcherAffiliation,
      "id" | "to" | "end_date_recorded_at" | "end_date_source"
    > & {
      organisation: Pick<Organisation, "id" | "organisation_name">;
    };
  };
}

type GetCustodianAccessRevocationsResponse = CustodianAccessRevocation[];

interface PutCustodianAccessRevokedParams {
  custodianId: number;
  custodianProjectUserId: number;
}

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
  GetCustodianDecisionModelResponse,
  PutCustodianActiveDecisionModelPayload,
  PutCustodianActiveDecisionModelResponse,
  GetCustodiansUserProjectsResponse,
  GetCustodianOrganisationsResponse,
  GetCustodianOrganisationUsersResponse,
  GetCustodianUsersResponse,
  PostCustodianProjectResponse,
  PostCustodianProjectPayload,
  CustodianAccessRevocation,
  GetCustodianAccessRevocationsResponse,
  PutCustodianAccessRevokedParams,
  GetCustodianStatusResponse,
};
