import { UserGroup } from "@/consts/user";
import { User } from "@/types/application";

type MeResponse = User;

interface PostRegisterPayload {
  account_type: UserGroup;
  organisation_id?: number;
  t_and_c_agreed: boolean;
}

type PostRegisterResponse = User | null;

export type { MeResponse, PostRegisterPayload, PostRegisterResponse };
