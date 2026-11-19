import getMe from "@/app/actions/auth/getMe";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { getAccessToken } from "@/utils/auth";
import { needsLoggedInPermissions } from "@/utils/loggedInPermission";
import { redirectToPath } from "@/utils/redirects";
import { headers } from "next/headers";
import redirectApplication from "@/utils/router";

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

jest.mock("next-intl/server", () => ({
  getLocale: jest.fn().mockResolvedValue("en"),
}));

jest.mock("@/app/actions/auth/getMe", () => jest.fn());

jest.mock("@/utils/auth", () => ({
  getAccessToken: jest.fn(),
}));

jest.mock("@/utils/redirects", () => ({
  redirectToPath: jest.fn(),
  getRefreshTokenRedirectPath: jest.fn(),
  getSeverErrorRedirectPath: jest.fn(),
}));

const withPath = (pathname: string) => {
  (headers as jest.Mock).mockResolvedValue({
    get: (name: string) => (name === "x-current-path" ? pathname : null),
  });
};

describe("needsLoggedInPermissions", () => {
  it("handles needed permissions", async () => {
    const result = needsLoggedInPermissions(
      [
        {
          path: "/admin",
          permissions: [UserGroup.ADMINS],
        },
      ],
      "/admin"
    );

    expect(result).toEqual(true);
  });

  it("handles no permissions", async () => {
    const result = needsLoggedInPermissions(
      [
        {
          path: "/admin",
        },
      ],
      "/admin"
    );

    expect(result).toEqual(false);
  });
});

describe("redirectApplication", () => {
  const pathname = "/en/user/profile/home";

  beforeEach(() => {
    withPath(pathname);
    (getAccessToken as jest.Mock).mockResolvedValue("access-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("sends a logged-in user to their profile and returns them", async () => {
    const me = mockedUser({ user_group: UserGroup.USERS });
    (getMe as jest.Mock).mockResolvedValue({ status: 200, data: me });

    await expect(redirectApplication()).resolves.toBe(me);

    expect(redirectToPath).toHaveBeenCalledWith(
      ROUTES.profileResearcher.path,
      pathname
    );
  });

  it("sends a user with no Registry account to register", async () => {
    (getMe as jest.Mock).mockResolvedValue({ status: 404, data: null });

    await redirectApplication();

    expect(redirectToPath).toHaveBeenCalledWith(ROUTES.register.path, pathname);
  });

  it("leaves excluded pages alone", async () => {
    withPath(ROUTES.invite.path);

    await expect(redirectApplication()).resolves.toBeNull();

    expect(getMe).not.toHaveBeenCalled();
    expect(redirectToPath).not.toHaveBeenCalled();
  });

  it("sends a logged-out user to the homepage", async () => {
    (getAccessToken as jest.Mock).mockResolvedValue(undefined);

    await redirectApplication();

    expect(getMe).not.toHaveBeenCalled();
    expect(redirectToPath).toHaveBeenCalledWith(ROUTES.homepage.path, pathname);
  });
});
