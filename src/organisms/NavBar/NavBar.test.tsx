import { StoreState, useStore } from "@/data/store";
import { mockedJwt } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import theme from "@/theme";
import { get } from "js-cookie";
import getMe from "@/app/actions/auth/getMe";
import { ResponseJson } from "@/types/requests";
import { User } from "@/types/application";
import { handleLogout } from "../../utils/keycloak";
import { useRouter } from "next/navigation";
import {
  defineMatchMedia,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import NavBar from "./NavBar";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedCustodian } from "@/mocks/data/custodian";
import { CustodianUserRoles } from "@/consts/custodian";
import { UserGroup } from "@/consts/user";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("../../utils/keycloak", () => ({
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}));

jest.mock("@/i18n/routing", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/data/store");

jest.mock("../NotificationsMenu", () => ({
  __esModule: true,
  default: () => <div data-testid="notifications-menu-stub" />,
}));

jest.mock("@/app/actions/auth/getMe", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetMe = getMe as jest.MockedFunction<typeof getMe>;
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const linksText = ["Home", "How it works", "About", "Get involved"];

const renderMobileMenuTest = () => {
  defineMatchMedia(theme.breakpoints.values.xs);

  const rendered = render(<NavBar />);

  fireEvent.click(screen.getByLabelText("open mobile menu"));

  return rendered;
};

describe("NavBar Component", () => {
  beforeEach(() => {
    mockUseStore.mockReturnValue([undefined, jest.fn()]);

    mockGetMe.mockResolvedValue({
      status: 200,
      data: mockedUser(),
    } as unknown as ResponseJson<User>);

    jest.clearAllMocks();
  });

  it.each(linksText)("renders nav item %s", name => {
    render(<NavBar loggedIn />);

    expect(
      screen.getByRole("link", {
        name,
      })
    ).toBeInTheDocument();
  });

  it("navigates to /sign-in on Sign In click when not authenticated", () => {
    render(<NavBar />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign In",
      })
    );

    expect(useRouter().push).toHaveBeenCalledWith("/sign-in");
  });

  it("displays 'Sign In' if the user is not authenticated", () => {
    render(<NavBar />);

    expect(
      screen.getByRole("button", {
        name: "Sign In",
      })
    ).toBeInTheDocument();
  });

  it("shows the mobile menu", async () => {
    renderMobileMenuTest();

    const mobileNav = screen.getByTestId("header-mobile-menu");

    await waitFor(() => {
      expect(mobileNav).toBeInTheDocument();
    });
  });

  it("calls handleLogout on 'Sign Out' click when authenticated", () => {
    (get as jest.Mock).mockReturnValue(mockedJwt);

    mockUseStore.mockImplementation(selector =>
      selector({
        getUser: () => mockedUser(),
        setUser: jest.fn(),
        config: {
          organisation: mockedOrganisation,
          custodian: mockedCustodian,
        },
      } as unknown as StoreState)
    );

    render(<NavBar loggedIn />);

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    expect(handleLogout).toHaveBeenCalled();
  });

  describe("account type chip", () => {
    const mockAccountTypeStore = (
      user: Partial<User>,
      custodianRole: CustodianUserRoles | null = null
    ) =>
      mockUseStore.mockImplementation(selector =>
        selector({
          getUser: () => mockedUser({ unclaimed: false, ...user }),
          setUser: jest.fn(),
          config: {
            organisation: undefined,
            custodian: undefined,
            custodianRole,
          },
        } as unknown as StoreState)
      );

    it.each([
      ["Super-admin", { user_group: UserGroup.ADMINS }, null],
      ["User", { user_group: UserGroup.USERS }, null],
      [
        "Organisation: SRO",
        {
          user_group: UserGroup.ORGANISATIONS,
          organisation_id: 1,
          is_sro: true,
        },
        null,
      ],
      [
        "Organisation: Delegate",
        {
          user_group: UserGroup.ORGANISATIONS,
          organisation_id: 1,
          is_sro: false,
        },
        null,
      ],
      [
        "Custodian: Admin",
        { user_group: UserGroup.CUSTODIANS },
        CustodianUserRoles.ADMINISTRATOR,
      ],
      [
        "Custodian: Approver",
        { user_group: UserGroup.CUSTODIANS },
        CustodianUserRoles.APPROVER,
      ],
      [
        "Custodian: View only",
        { user_group: UserGroup.CUSTODIANS },
        CustodianUserRoles.VIEWER,
      ],
    ])("displays '%s'", (label, user, custodianRole) => {
      mockAccountTypeStore(user, custodianRole);

      render(<NavBar loggedIn />);

      expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("shows the 'Senior Responsible Officer' tooltip on the SRO chip", async () => {
      mockAccountTypeStore({
        user_group: UserGroup.ORGANISATIONS,
        organisation_id: 1,
        is_sro: true,
      });

      render(<NavBar loggedIn />);

      const chip = screen.getByTestId("account-type-chip");

      expect(chip).toHaveAttribute("tabindex", "0");
      expect(chip).not.toHaveAttribute("aria-label");

      fireEvent.mouseOver(chip);

      const tooltip = await screen.findByRole("tooltip");

      expect(tooltip).toHaveTextContent("Senior Responsible Officer");
      expect(chip).toHaveAttribute("aria-describedby", tooltip.id);
    });

    it("hides the chip while the user is registering", () => {
      mockAccountTypeStore({ unclaimed: true });

      render(<NavBar loggedIn />);

      expect(screen.queryByText("User")).not.toBeInTheDocument();
    });
  });

  it("displays 'My Account' and 'Sign Out' if the user is authenticated", () => {
    mockGetMe.mockResolvedValueOnce({
      status: 200,
      data: { first_name: "Test", last_name: "User" },
    });

    mockUseStore.mockImplementation(selector =>
      selector({
        getUser: () => mockedUser(),
        setUser: jest.fn(),
        config: {
          organisation: undefined,
          custodian: undefined,
        },
      } as unknown as StoreState)
    );

    (get as jest.Mock).mockReturnValue(mockedJwt);

    render(<NavBar loggedIn />);

    expect(
      screen.getByRole("button", {
        name: "Sign Out",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "My Account",
      })
    ).toBeInTheDocument();
  });

  it.each([
    ["shows", false, true],
    ["hides", true, false],
  ])(
    "%s notifications when the user's unclaimed is %s",
    (_, unclaimed, isShown) => {
      mockUseStore.mockImplementation(selector =>
        selector({
          getUser: () => mockedUser({ unclaimed }),
          setUser: jest.fn(),
          config: {
            organisation: undefined,
            custodian: undefined,
          },
        } as unknown as StoreState)
      );

      render(<NavBar loggedIn />);

      expect(screen.queryByTestId("notifications-menu-stub") !== null).toBe(
        isShown
      );
    }
  );
});
