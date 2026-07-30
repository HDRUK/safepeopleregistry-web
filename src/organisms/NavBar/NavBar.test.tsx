import { StoreState, useStore } from "@/data/store";
import { mockedJwt } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import theme from "@/theme";
import { get } from "js-cookie";
import getMe from "@/app/actions/auth/getMe";
import { ResponseJson } from "@/types/requests";
import { User } from "@/types/application";
import { handleLogin, handleLogout } from "../../utils/keycloak";
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
import { AccountType } from "@/types/accounts";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("../../utils/keycloak", () => ({
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}));

jest.mock("@/i18n/routing", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/data/store");

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

  it("calls handleLogin on Sign In click when not authenticated", () => {
    render(<NavBar />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign In",
      })
    );

    expect(handleLogin).toHaveBeenCalled();
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

  it("displays 'Organisation' chip when the user belongs to an organisation", () => {
    mockUseStore.mockImplementation(selector =>
      selector({
        getUser: () => mockedUser(),
        setUser: jest.fn(),
        config: {
          organisation: mockedOrganisation,
          custodian: undefined,
        },
      } as unknown as StoreState)
    );

    render(<NavBar loggedIn />);

    expect(screen.getByText(AccountType.ORGANISATION)).toBeInTheDocument();
  });

  it("displays 'Custodian' chip when the user belongs to an custodian", () => {
    mockUseStore.mockImplementation(selector =>
      selector({
        getUser: () => mockedUser(),
        setUser: jest.fn(),
        config: {
          organisation: undefined,
          custodian: mockedCustodian,
        },
      } as unknown as StoreState)
    );

    render(<NavBar loggedIn />);

    expect(screen.getByText(AccountType.CUSTODIAN)).toBeInTheDocument();
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
});
