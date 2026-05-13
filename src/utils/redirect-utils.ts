import { ROUTES } from "@/consts/router";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";

const getRegisterRedirectPath = () => {
  return ROUTES.register.path;
};

function getHomepageRedirectPath() {
  return ROUTES.homepage.path;
}

function removeLocalePrefix(pathname: string) {
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

function isInPath(pathname: string, pathToCompare: string | string[]) {
  const normalisedPathname = removeLocalePrefix(pathname);

  if (Array.isArray(pathToCompare)) {
    return pathToCompare.some(item =>
      removeLocalePrefix(item).includes(normalisedPathname)
    );
  }

  return removeLocalePrefix(pathToCompare).includes(normalisedPathname);
}

const getProfileRedirectPath = (user: User) => {
  const redirectPath = getProfilePathByEntity(user);

  return redirectPath;
};

export {
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  isInPath,
  getProfileRedirectPath,
  removeLocalePrefix,
};
