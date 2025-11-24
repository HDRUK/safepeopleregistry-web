import { RouteConfig, Routes } from "../types/router";

function needsLoggedInPermissions(routes: Routes, pathname: string | null) {
  if (!pathname) return false;

  return Object.keys(routes).some((key: string) => {
    const route: RouteConfig = routes[key as keyof Routes];

    return pathname.includes(route.path, 0) && route.permissions;
  });
}

export { needsLoggedInPermissions };
