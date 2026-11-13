import { ROUTES } from "@/consts/router";
import useCustodianViewerAccess from "@/hooks/useCustodianViewerAccess";
import { usePathname, useRouter } from "@/i18n/routing";
import { render, screen } from "@/utils/testUtils";
import CustodianViewerAccess from "./CustodianViewerAccess";

jest.mock("@/hooks/useCustodianViewerAccess");

const mockAccess = (
  access: Partial<ReturnType<typeof useCustodianViewerAccess>>
) => {
  (useCustodianViewerAccess as jest.Mock).mockReturnValue({
    isLoading: false,
    isViewer: false,
    isViewOnly: false,
    isViewerDisabled: false,
    ...access,
  });
};

const renderGuard = () =>
  render(
    <CustodianViewerAccess>
      <div>Custodian pages</div>
    </CustodianViewerAccess>
  );

const mockReplace = jest.fn();

describe("<CustodianViewerAccess />", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: mockReplace,
    });
    (usePathname as jest.Mock).mockReturnValue(
      ROUTES.profileCustodianHome.path
    );
  });

  it("renders the pages for non-viewers", () => {
    mockAccess({});

    renderGuard();

    expect(screen.getByText("Custodian pages")).toBeInTheDocument();
  });

  it("renders the pages for a viewer when the flag is on", () => {
    mockAccess({ isViewer: true, isViewOnly: true });

    renderGuard();

    expect(screen.getByText("Custodian pages")).toBeInTheDocument();
  });

  it("shows a loader instead of the pages while the role is loading", () => {
    mockAccess({ isLoading: true });

    renderGuard();

    expect(screen.queryByText("Custodian pages")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("blocks a viewer when the flag is off", () => {
    mockAccess({ isViewer: true, isViewerDisabled: true });

    renderGuard();

    expect(screen.queryByText("Custodian pages")).not.toBeInTheDocument();
    expect(
      screen.getByText("Read-only accounts are disabled")
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:")
    );
    expect(
      screen.getByRole("button", { name: "Sign out" })
    ).toBeInTheDocument();
  });

  describe("login landing page", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue(ROUTES.profileCustodian.path);
    });

    it("sends a viewer to the Projects tab", () => {
      mockAccess({ isViewer: true, isViewOnly: true });

      renderGuard();

      expect(mockReplace).toHaveBeenCalledWith(
        ROUTES.profileCustodianProjects.path
      );
      expect(screen.queryByText("Custodian pages")).not.toBeInTheDocument();
    });

    it("keeps other custodians on Home", () => {
      mockAccess({});

      renderGuard();

      expect(mockReplace).not.toHaveBeenCalled();
      expect(screen.getByText("Custodian pages")).toBeInTheDocument();
    });
  });

  it("lets a viewer open the Home tab directly", () => {
    mockAccess({ isViewer: true, isViewOnly: true });

    renderGuard();

    expect(mockReplace).not.toHaveBeenCalled();
    expect(screen.getByText("Custodian pages")).toBeInTheDocument();
  });
});
