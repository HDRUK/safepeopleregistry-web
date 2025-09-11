import { Status } from "@/components/ChipStatus";
import { FileStatus, FileType } from "@/consts/files";
import { RequestFrequency } from "@/consts/projects";
import {
  UserFeedSource,
  UserGroup,
  UserProfileCompletionCategories,
} from "@/consts/user";
import { RouteConfig } from "./router";
import { RuleState } from "./rules";
import { QueryParams } from "./query";

interface StateWorkflow {
  transitions: Record<string, string[]>;
}

type WithStateWorkflow<T> = T & {
  stateWorkflow: StateWorkflow;
};

type Translations =
  | {
      rich: (key: string | Error, options: unknown) => string;
    }
  | ((key: string) => string);

type WithTranslations<T> = T & {
  t: Translations;
};

type ModelState = {
  state: {
    slug: Status;
  };
};

type WithModelState<T> = T & {
  model_state: ModelState;
};

type WithRoutes<T> = T & {
  routes: Record<string, RouteConfig>;
};

type WithPaginatedQueryParms<T> = T & {
  paginatedQueryParams: QueryParams;
};

interface File {
  id: number;
  name: string;
  path: string;
  status: keyof typeof FileStatus;
  type: keyof typeof FileType;
  created_at: string;
  updated_at: string;
}

interface Sector {
  name: string;
  id: string;
}

interface Permission {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  enabled: boolean;
  pivot?: {
    organisation_id: number;
    permission_id: number;
  };
}

type Custodian = WithModelState<{
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  permissions: Permission[];
  unique_identifier: string;
  idvt_required: boolean;
  gateway_app_id: string | null;
  gateway_client_id: string | null;
  client_id: string | null;
}>;

type Approval = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  pivot: {
    organisation_id: number;
    custodian_id: number;
  };
};

interface UserPermission {
  custodian_user_id: number;
  permission_id: number;
  permission: Permission;
}

interface CustodianUser {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  custodian_id: number;
  user_permissions: UserPermission[];
}

interface UserProfileCompletionFields {
  name: string;
  required?: boolean;
}

type UserProfileCompletionSchema = Record<
  UserProfileCompletionCategories,
  UserProfileCompletionFields[]
>;

type UserProfileCompletionJson = Record<
  UserProfileCompletionCategories,
  {
    score: number;
    fields: (UserProfileCompletionFields & {
      hasValue: boolean;
    })[];
  }
>;

interface Auth {
  email: string;
  given_name: string;
  family_name: string;
}

type Identity = {
  address_1: string;
  address_2: string;
  country: string;
  county: string;
  created_at: string;
  deleted_at?: string;
  dob: string;
  drivers_license_path: string;
  id: number;
  idvt_completed_at: string;
  idvt_errors?: string;
  idvt_result: number;
  idvt_result_perc: number;
  idvt_started_at: string;
  idvt_success: number;
  passport_path: string;
  postcode: string;
  registry_id: number;
  selfie_path: string;
  town: string;
  updated_at?: string;
};

type User = WithModelState<{
  id: number;
  registry_id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: UserGroup;
  permissions: Permission[];
  profile_completed_at: string | null;
  profile_steps_completed: string;
  approvals: Approval[];
  organisation_id?: number | null;
  organisation?: Organisation;
  custodian_id?: number;
  custodian_user_id?: number;
  consent_scrape: boolean;
  orc_id: string | null;
  orcid_scanning: boolean;
  orcid_scanning_completed_at: string | null;
  created_at: string;
  feed_source?: UserFeedSource;
  unclaimed?: number;
  registry: {
    digi_ident: string;
    files?: File[];
    organisations?: Organisation[];
    verified: boolean;
    training?: ResearcherTraining[];
    affiliations?: ResearcherAffiliation[];
    identity?: Identity;
  };
  is_delegate: number;
  departments?: Department[];
  role?: string;
  location?: string;
  status: Status;
  declaration_signed?: boolean;
  uksa_registered?: boolean;
  rules?: RuleState;
  t_and_c_agreed?: boolean;
}>;
interface AddressFields {
  postcode?: string;
  address_1?: string;
  address_2?: string | null;
  town?: string;
  county?: string;
  country?: string;
}

interface Subsidiary extends AddressFields {
  id?: number;
  name: string;
  pivot?: {
    organisation_id: number;
    subsidiary_id: number;
  };
  website?: string;
}

interface Charity extends AddressFields {
  id: number;
  registration_id: string;
  name: string;
  country: string;
  website?: string;
}

interface OrganisationIdvt {
  idvt_result: boolean | null;
  idvt_completed_at: string;
  idvt_result_perc: number;
  idvt_errors: string;
}

type Organisation = OrganisationIdvt &
  AddressFields &
  WithModelState<{
    companies_house_no: string;
    organisation_name: string;
    organisation_unique_id: string;
    sector: Sector;
    dpo_name: string;
    dpo_email: string;
    hr_name: string;
    hr_email: string;
    id: number;
    permissions: Permission[];
    approvals: Approval[];
    lead_applicant_email: string;
    lead_applicant_organisation_name: string;
    sector_id: number;
    charities: Charity[];
    ror_id: string;
    website: string;
    smb_status: boolean;
    registries: {
      user: User;
      verified: boolean;
    }[];
    ce_certified: boolean;
    ce_certification_num: string;
    ce_expiry_date: string;
    ce_expiry_evidence: File | null;
    ce_plus_certified: boolean;
    ce_plus_certification_num: string;
    ce_plus_expiry_date: string;
    ce_plus_expiry_evidence: File | null;
    iso_27001_certified: boolean;
    iso_27001_certification_num: string;
    iso_expiry_date: string;
    iso_expiry_evidence: File | null;
    dsptk_certified: boolean;
    dsptk_ods_code: string;
    dsptk_expiry_date: string;
    dsptk_expiry_evidence: File | null;
    subsidiaries?: Subsidiary[];
    departments: Department[];
    unclaimed: number;
    organisation_size?: number;
    project?: WithModelState<ResearcherProject>;
    system_approved?: boolean;
  }>;

interface ResearcherEducation {
  institute_name: string;
  institute_address: string;
  from: string;
  to: string;
  title: string;
  institute_indentifier: string;
  source: string;
}

interface ResearcherProfessionalRegistration {
  id: number;
  name: string;
  member_id: string;
}

interface ResearcherAccreditation {
  id: number;
  awarded_at: string;
  awarding_body_name: string;
  awarding_body_ror: string;
  expires_at: string;
  title: string;
  awarded_locale: string;
}

interface ResearcherTraining {
  awarded_at: string;
  provider: string;
  awarding_body_ror: string;
  expires_at: string;
  training_name: string;
  expires_in_years: number;
  id: number;
  certification_id?: number;
}

interface ResearcherEmployment {
  id: number | string;
  department: string;
  role: string;
  is_current: boolean;
  from: string;
  to: string;
  employer_name: string;
  ror: string;
}

interface ResearcherEndorsement {
  id: number;
  comment: string;
  raised_against: number;
  reported_by: number;
}

type ResearcherAffiliation = WithModelState<{
  id: number;
  member_id: string;
  organisation_id?: number;
  organisation_name?: string;
  organisation_email?: string;
  relationship?: string;
  current_employer: boolean;
  from?: string | null;
  to?: string | null;
  role?: string;
  organisation: Partial<Organisation>;
  email?: string;
  project_role_id?: number;
  primary_contact?: boolean;
  registryAffiliationState?: string;
  department: string;
}>;

interface ResearcherProjectApproval {
  project_id: number;
  custodian_id: number;
}

interface ProjectRole {
  id: number;
  name: string;
}

type ResearcherProject = WithModelState<{
  id: number;
  title: string;
  lay_summary: string;
  public_benefit: string;
  technical_summary: string;
  start_date: string;
  end_date: string;
  request_category_type: string;
  other_approval_committees: string;
  affiliate_id: number;
  unique_id: string;
  approvals: ResearcherProjectApproval[];
  organisations: Organisation[];
  custodians?: Custodian[];
  project_detail: ProjectDetails;
  status: Status;
}>;

interface ProjectDetails {
  access_type: string;
  id: number;
  project_id: number;
  datasets?: string[];
  other_approval_committees?: string[];
  data_sensitivity_level?: string;
  legal_basis_for_data_article6?: string;
  duty_of_confidentiality: boolean;
  national_data_optout: boolean;
  request_frequency?: RequestFrequency;
  dataset_linkage_description?: string;
  data_minimisation?: string;
  data_use_description?: string;
  access_date?: string;
  data_privacy?: string;
  research_outputs?: string[];
  data_assets?: string;
}

interface Registry {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  verified: boolean;
  user: User;
  organisations: Organisation[];
  employment?: ResearcherEmployment;
  education: ResearcherEducation[];
  training: ResearcherTraining[];
  accreditations: ResearcherAccreditation[];
  professionalRegistrations: ResearcherProfessionalRegistration[];
}

interface Role {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
}

interface ProjectUser {
  id: number;
  project_id: number;
  project: Project;
  project_role_id: number;
  primary_contact: boolean;
  user_digital_ident: string;
  role?: Partial<Role>;
  affiliation: Partial<ResearcherAffiliation>;
  registry: Registry;
  custodian_has_project_user?: CustodianProjectUser;
}

type CustodianProjectUser = WithModelState<{
  id: number;
  project_has_user_id: number;
  custodian_id: number;
  created_at: string;
  updated_at: string;
  project_has_user: ProjectUser;
}>;

interface ProjectOrganisation {
  id: number;
  project_id: number;
  organisation_id: number;
  organisation: Organisation;
  project: Project;
}

type CustodianProjectOrganisation = WithModelState<{
  id: number;
  project_has_organisation_id: number;
  custodian_id: number;
  created_at: string;
  updated_at: string;
  project_organisation: ProjectOrganisation;
}>;

type ProjectAllUser = WithModelState<{
  id: number;
  project_user_id?: number | null;
  user_id: number;
  registry_id: number;
  first_name: string;
  last_name: string;
  email: string;
  affiliation_id: number;
  organisation_name: string;
  role: Partial<Role>;
  digi_ident: string;
  project_id: number;
  project_name: string;
  project_role: string;
  organisation_id: number;
}>;

interface Department {
  category: string;
  created_at: string;
  id: number;
  name: string;
  pivot: {
    organisation_id: number;
    department_id: number;
  };
  updated_at: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type SystemConfig = Record<string, any>;

export type {
  AddressFields,
  Approval,
  Auth,
  Custodian,
  CustodianUser,
  CustodianProjectUser,
  CustodianProjectOrganisation,
  Charity,
  Department,
  File,
  Identity,
  Organisation,
  OrganisationIdvt,
  Permission,
  Project,
  ProjectUser,
  ProjectOrganisation,
  ProjectAllUser,
  ResearcherAccreditation,
  ResearcherAffiliation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherEndorsement,
  ResearcherProfessionalRegistration,
  ResearcherProject,
  ResearcherTraining,
  Role,
  Sector,
  Subsidiary,
  SystemConfig,
  User,
  UserProfileCompletionFields,
  UserProfileCompletionJson,
  UserProfileCompletionSchema,
  ProjectRole,
  ProjectDetails,
  WithStateWorkflow,
  StateWorkflow,
  Translations,
  WithTranslations,
  ModelState,
  WithModelState,
  WithRoutes,
  WithPaginatedQueryParms,
  UserPermission,
};
