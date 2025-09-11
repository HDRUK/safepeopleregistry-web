import { UserGroup } from "@/consts/user";
import { User } from "@/types/application";

type MeResponse = User;

interface PostRegisterPayload {
  account_type: UserGroup;
  organisation_id?: number;
}

interface PostClaimUserPayload {
  registry_id: number;
}

type PostRegisterResponse = User | null;

export type {
  MeResponse,
  PostRegisterPayload,
  PostClaimUserPayload,
  PostRegisterResponse,
};
