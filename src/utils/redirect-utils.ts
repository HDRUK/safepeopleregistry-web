import { ROUTES } from "@/consts/router";
import { User } from "@/types/application";
import { getProfilePathByEntity } from "@/utils/entity";

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
  const redirectPath = getProfilePathByEntity(user);

  return redirectPath;
};

export {
  getHomepageRedirectPath,
  getRegisterRedirectPath,
  isInPath,
  getProfileRedirectPath,
};
