import { useStore } from "@/data/store";
import { mockedJwt } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import theme from "@/theme";
import { get } from "js-cookie";
import getMe from "@/services/auth/getMe";
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
}));

jest.mock("@/data/store");

jest.mock("@/services/auth/getMe", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetMe = getMe as jest.MockedFunction<typeof getMe>;
const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

const linksText = ["Home", "About", "Features", "Contact", "Help"];

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
      })
    );

    render(<NavBar loggedIn />);

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    expect(handleLogout).toHaveBeenCalled();
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
      })
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
