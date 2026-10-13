import { postClaimUser } from "@/app/actions/auth";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { cookies } from "next/headers";
import { registerInvite } from "./actions";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("@/app/actions/auth", () => ({
  postClaimUser: jest.fn(),
  postRegister: jest.fn(),
}));

jest.mock("@/app/actions/organisations", () => ({
  postOrganisationNewAccount: jest.fn(),
  putOrganisation: jest.fn(),
}));

const INVITE_CODE = "6f1c1c9e-4b6e-4c1a-9a43-2d7c1e0b5f10";

const organisationInvitee = mockedUser({
  id: 5,
  user_group: UserGroup.ORGANISATIONS,
  organisation_id: 1,
  is_sro: false,
  is_delegate: 1,
});

let cookieJar: Map<string, string>;

const withCookies = (initial: Record<string, string>) => {
  cookieJar = new Map(Object.entries(initial));

  (cookies as jest.Mock).mockResolvedValue({
    get: (name: string) =>
      cookieJar.has(name) ? { name, value: cookieJar.get(name) } : undefined,
    set: (name: string, value: string) => cookieJar.set(name, value),
    delete: (name: string) => cookieJar.delete(name),
  });
};

describe("registerInvite", () => {
  beforeEach(() => {
    (postClaimUser as jest.Mock).mockResolvedValue({ data: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("claims an organisation invitee's account with the invite code from their invite link", async () => {
    withCookies({ invite_code: INVITE_CODE, account_type: "organisation" });

    await expect(
      registerInvite(organisationInvitee, UserGroup.ORGANISATIONS)
    ).resolves.toEqual({ ok: true });

    expect(postClaimUser).toHaveBeenCalledWith(5, INVITE_CODE);
    expect(cookieJar.has("invite_code")).toBe(false);
    expect(cookieJar.has("account_type")).toBe(false);
  });

  it("does not try to claim an account without an invite code", async () => {
    withCookies({ account_type: "organisation" });

    await expect(
      registerInvite(organisationInvitee, UserGroup.ORGANISATIONS)
    ).resolves.toEqual({ ok: false });

    expect(postClaimUser).not.toHaveBeenCalled();
  });

  it("keeps the invite so a failed claim can be retried", async () => {
    withCookies({ invite_code: INVITE_CODE, account_type: "organisation" });
    (postClaimUser as jest.Mock).mockRejectedValue(new Error("Not found"));

    await expect(
      registerInvite(organisationInvitee, UserGroup.ORGANISATIONS)
    ).resolves.toEqual({ ok: false });

    expect(cookieJar.get("invite_code")).toBe(INVITE_CODE);
    expect(cookieJar.get("account_type")).toBe("organisation");
  });
});
