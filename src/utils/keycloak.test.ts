import { getRegisterUrl, handleLogin, handleLogout } from "./keycloak";

describe("Auth functions", () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();

    Object.defineProperty(window, "location", {
      value: { href: "", assign: jest.fn(), replace: jest.fn() },
      writable: true,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should generate the correct URL and update window.location.href on login", () => {
    handleLogin();

    // Construct expected auth URL and query parameters
    const expectedUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Flogin-callback&scope=openid+profile+email`;

    // Verify that window.location.href is set correctly
    expect(window.location.href).toBe(expectedUrl);
  });

  it("should generate the correct URL and update window.location.href on logout", () => {
    handleLogout();

    // Construct expected logout URL and query parameters
    const expectedUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=https%3A%2F%2Fexample.com%2Flogout-callback`;

    // Verify that window.location.href is set correctly
    expect(window.location.href).toBe(expectedUrl);
  });

  it("should append extra params (e.g. loginHint) to the register URL", () => {
    const loginHint = "biscuit";

    const urlString = getRegisterUrl(null, { loginHint });
    const url = new URL(urlString);

    expect(url.searchParams.get("loginHint")).toBe("biscuit");
  });
});
