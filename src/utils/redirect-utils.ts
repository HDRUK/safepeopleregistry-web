import { ROUTES } from "@/consts/router";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";
import { isVerificationCode } from "@/utils/affiliations";
import { isWithoutOrganisation } from "@/utils/organisation";
import { isRegistrationIncomplete } from "@/utils/user";

const getRegisterRedirectPath = () => {
  return ROUTES.register.path;
};

function getHomepageRedirectPath() {
  return ROUTES.homepage.path;
}

function isInPath(pathname: string, pathToCompare: string | string[]) {
  if (Array.isArray(pathToCompare)) {
    return pathToCompare.some(item => item.includes(pathname));
  }

  return pathToCompare.includes(pathname);
}

const getProfileRedirectPath = (user: User) => {
  // Organisation pages need an organisation, so users without one get a page of their own.
  if (user && isWithoutOrganisation(user)) {
    return ROUTES.noOrganisation.path;
  }

  if (user && isRegistrationIncomplete(user)) {
    return ROUTES.addAffiliation.path;
  }

  const redirectPath = getProfilePathByEntity(user);

  return redirectPath;
};

function getAddAffiliationPath(search: string | null) {
  const verify = new URLSearchParams(search ?? "").get("verify");

  if (!isVerificationCode(verify)) {
    return ROUTES.addAffiliation.path;
  }

  return `${ROUTES.addAffiliation.path}?${new URLSearchParams({ verify })}`;
}

export {
  getAddAffiliationPath,
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  isInPath,
  getProfileRedirectPath,
};
