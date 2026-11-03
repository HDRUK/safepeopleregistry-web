import getMe from "@/app/actions/auth/getMe";
import { useStore } from "@/data/store";
import { usePathname } from "@/i18n/routing";
import { mockedUser } from "@/mocks/data/user";
import { User } from "@/types/application";
import { ResponseJson } from "@/types/requests";
import { mockUseSearchParams } from "jest.setup";
import { render, screen, waitFor } from "../../utils/testUtils";
import ApplicationUser from "./ApplicationUser";

jest.mock("@/app/actions/auth/getMe", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetMe = jest.mocked(getMe);
const mockUsePathname = jest.mocked(usePathname);
const mockUseStore = jest.mocked(useStore);
const mockSetUser = jest.fn();

const renderAt = (pathname: string, search = "") => {
  const searchParams = new URLSearchParams(search);

  mockUsePathname.mockReturnValue(pathname);
  mockUseSearchParams.has.mockImplementation(key => searchParams.has(key));

  return render(
    <ApplicationUser>
      <div>Page content</div>
    </ApplicationUser>
  );
};

describe("<ApplicationUser />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore.mockImplementation(selector =>
      selector({ setUser: mockSetUser } as unknown as Parameters<
        typeof selector
      >[0])
    );

    mockGetMe.mockResolvedValue({
      status: 200,
      data: mockedUser(),
    } as unknown as ResponseJson<User>);
  });

  it("does not fetch the user while registration completes on /register?type=", () => {
    renderAt("/register", "type=USERS");

    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(mockGetMe).not.toHaveBeenCalled();
    expect(mockSetUser).toHaveBeenCalledWith({});
  });

  it("fetches the user on /register without a type", async () => {
    renderAt("/register");

    expect(await screen.findByText("Page content")).toBeInTheDocument();
    expect(mockGetMe).toHaveBeenCalledTimes(1);
  });

  it("fetches the user and stores it on other pages", async () => {
    const user = mockedUser();

    mockGetMe.mockResolvedValue({
      status: 200,
      data: user,
    } as unknown as ResponseJson<User>);

    renderAt("/admin");

    expect(await screen.findByText("Page content")).toBeInTheDocument();
    expect(mockGetMe).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(user));
  });
});
