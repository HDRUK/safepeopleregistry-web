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

  const matches = (path: string) => {
    const normalisedPath = removeLocalePrefix(path);

    // homepage should only match homepage
    if (normalisedPathname === "/") {
      return normalisedPath === "/";
    }

    return normalisedPath.includes(normalisedPathname);
  };

  if (Array.isArray(pathToCompare)) {
    return pathToCompare.some(matches);
  }

  return matches(pathToCompare);
}

const getProfileRedirectPath = (user: User) => {
  const redirectPath = getProfilePathByEntity(user);

  console.log("REDIRECT PATH");

  return redirectPath;
};

export {
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  isInPath,
  getProfileRedirectPath,
  removeLocalePrefix,
};
