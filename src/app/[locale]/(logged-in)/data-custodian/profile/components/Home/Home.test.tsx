import { useStore } from "@/data/store";
import { mockedCustodian } from "@/mocks/data/custodian";
import { mockedUser } from "@/mocks/data/user";
import useIsCustodianViewOnly from "@/hooks/useIsCustodianViewOnly";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import Home, { HomeProps } from "./Home";

jest.mock("@/services/custodians");
jest.mock("@/data/store");
// Tested in its own right.
jest.mock("@/organisms/AccessRevocations", () => () => (
  <div>Access revocations</div>
));
jest.mock("@/organisms/ActionLogs", () => () => <div>Action logs</div>);
jest.mock("@/hooks/useIsCustodianViewOnly", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const defaultCustodian = mockedCustodian();
const defaultUser = mockedUser();

const renderHome = (props?: Partial<HomeProps>) => {
  return render(<Home custodian={defaultCustodian} {...props} />);
};

describe("<Home />", () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockImplementation(() => [
      () => defaultUser,
      null,
    ]);
    (useIsCustodianViewOnly as jest.Mock).mockReturnValue(false);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderHome());
  });

  it("shows the actions to other custodians", async () => {
    renderHome();

    expect(await screen.findByText("Access revocations")).toBeInTheDocument();
    expect(screen.getByText("Action logs")).toBeInTheDocument();
  });

  it("shows a viewer a welcome line instead of the actions", async () => {
    (useIsCustodianViewOnly as jest.Mock).mockReturnValue(true);

    renderHome();

    expect(
      await screen.findByText(
        "Welcome to the Safe People Registry. This is a view-only account."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("Access revocations")).not.toBeInTheDocument();
    expect(screen.queryByText("Action logs")).not.toBeInTheDocument();
  });
});
