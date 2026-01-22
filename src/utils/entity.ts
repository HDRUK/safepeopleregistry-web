import { ROUTES } from "@/consts/router";
import { User } from "@/types/application";
import { Routes } from "@/types/router";
import { capitaliseFirstLetter } from "./string";

function getProfilePathByEntity(user: User | string) {
  if (!user) return ROUTES.homepage.path;

  const profileEntity = capitaliseFirstLetter(
    (typeof user === "string" ? user : user.user_group)
      .replace(/USER/i, "RESEARCHER")
      .replace(/s$/i, "")
      .toLowerCase()
  );

  return ROUTES[`profile${profileEntity}` as keyof Routes].path;
}

export { getProfilePathByEntity };
