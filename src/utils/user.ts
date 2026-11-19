import { UserGroup } from "@/consts/user";
import { Organisation, User } from "../types/application";

function getInitialsFromUser({ first_name, last_name }: User) {
  const fullName = `${first_name} ${last_name}`;

  return fullName.replace(/^(\w)[^\s]*[\s]*(\w)[\w]*/gi, "$1$2").toUpperCase();
}

function getInitialsFromOrganisation({ organisation_name }: Organisation) {
  return organisation_name?.charAt(0).toUpperCase();
}

function isOrcIdScanning(user: User | undefined) {
  return !!user?.orcid_scanning;
}

function isOrcIdCompleted(user: User | undefined) {
  return !!user?.orcid_scanning_completed_at;
}

function isRegistered({ unclaimed }: User) {
  return !unclaimed;
}

function isRegistrationIncomplete(
  user: Pick<User, "user_group" | "registration_complete">
): boolean {
  return (
    user.user_group === UserGroup.USERS && user.registration_complete === false
  );
}

export {
  isRegistrationIncomplete,
  getInitialsFromUser,
  getInitialsFromOrganisation,
  isOrcIdScanning,
  isOrcIdCompleted,
  isRegistered,
};
