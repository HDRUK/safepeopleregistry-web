import { ROUTES } from "@/consts/router";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";
import { isWithoutOrganisation } from "@/utils/organisation";

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

  const redirectPath = getProfilePathByEntity(user);

  return redirectPath;
};

export {
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  isInPath,
  getProfileRedirectPath,
};
