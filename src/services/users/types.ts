import { UserProvider, UserHistoryLog } from "../../consts/user";
import {
  PendingInvite,
  ResearcherProject,
  User,
} from "../../types/application";

type PutUserPayload = Partial<User>;

type PendingInviteResponse = PendingInvite;
interface UpdatePermissonsPayload {
  user_id: number;
  custodian_id: number;
  permissions: number[];
}

type PutUserResponse = User;

type UserResponse = User;

type UsersResponse = User[];

type UserProjectsResponse = ResearcherProject[];

type GetUserProjectsResponse = ResearcherProject[];

interface PostUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  consent_scrape: boolean;
  registry_id?: string;
  provider?: UserProvider;
  profile_steps_completed?: string;
  profile_completed_at?: string;
  is_researcher?: boolean;
  is_organisation?: boolean;
}

interface PostUserInvitePayload {
  first_name: string;
  last_name: string;
  email: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type PostUserResponse = any;

type PostUserInviteResponse = User;
type GetUserHistoryResponse = UserHistorys[];

interface UserHistorys {
  id: number;
  description: string;
  event: UserHistoryLog;
  log_name: string;
  properties: Record<string, Record<string, string>>;
  created_at: string;
  updated_at: string;
  subject_type: string;
  subject: Partial<User>;
  causer: Partial<User>;
}

interface PutEmailByInvitePayload {
  email: string;
}

interface PutEmailByInviteParams {
  inviteCode: string;
}

type PendingInvitesResponse = PendingInviteResponse[];

export type {
  PostUserPayload,
  PostUserResponse,
  UpdatePermissonsPayload,
  UserResponse,
  UsersResponse,
  PostUserInviteResponse,
  PostUserInvitePayload,
  PutUserResponse,
  PutUserPayload,
  UserProjectsResponse,
  UserHistorys,
  GetUserHistoryResponse,
  GetUserProjectsResponse,
  PendingInviteResponse,
  PutEmailByInvitePayload,
  PutEmailByInviteParams,
  PendingInvitesResponse,
};
