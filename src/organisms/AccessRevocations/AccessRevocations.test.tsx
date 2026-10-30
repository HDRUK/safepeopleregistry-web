import { mockedUser } from "@/mocks/data/user";
import { usePaginatedCustodianAccessRevocations } from "@/services/custodians";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import AccessRevocations from "./AccessRevocations";

jest.mock("@/services/custodians", () => ({
  ...jest.requireActual("@/services/custodians"),
  usePaginatedCustodianAccessRevocations: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const mockUsePaginated =
  usePaginatedCustodianAccessRevocations as jest.MockedFunction<
    typeof usePaginatedCustodianAccessRevocations
  >;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

const user = mockedUser({ first_name: "Jane", last_name: "Doe" });

const revocation = {
  id: 7,
  custodian_id: 1,
  project_has_user_id: 3,
  access_revocation_required_at: "2026-10-30 09:00:00",
  access_revocation_reminded_at: null,
  project_has_user: {
    id: 3,
    project: { id: 2, title: "Example Project" },
    registry: { id: user.registry_id, user },
    affiliation: {
      id: 4,
      to: "2026-10-29",
      end_date_recorded_at: "2026-10-30 09:00:00",
      end_date_source: null,
      organisation: { id: 5, organisation_name: "Example Organisation" },
    },
  },
};

const mockPaginated = (data: (typeof revocation)[]) =>
  mockUsePaginated.mockReturnValue({
    data,
    total: data.length,
    last_page: 1,
    page: 1,
    setPage: jest.fn(),
    refetch: jest.fn(),
    isLoading: false,
    isError: false,
  } as unknown as ReturnType<typeof usePaginatedCustodianAccessRevocations>);

const renderAccessRevocations = () =>
  render(<AccessRevocations custodianId={1} />);

describe("<AccessRevocations />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useMutation>);
  });

  it("renders nothing when no revocations are awaited", () => {
    mockPaginated([]);

    renderAccessRevocations();

    expect(
      screen.queryByText("Leavers: data access to revoke")
    ).not.toBeInTheDocument();
  });

  it("lists the users whose access must be revoked", () => {
    mockPaginated([revocation]);

    renderAccessRevocations();

    expect(
      screen.getByText("Leavers: data access to revoke")
    ).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Example Organisation")).toBeInTheDocument();
    expect(screen.getByText("Example Project")).toBeInTheDocument();
  });

  it("asks the Custodian to confirm the revocation", () => {
    mockPaginated([revocation]);

    renderAccessRevocations();

    fireEvent.click(
      screen.getByRole("button", { name: "Confirm access revoked" })
    );

    expect(
      screen.getByText(/This will be recorded against your name/)
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    mockPaginated([revocation]);

    commonAccessibilityTests(renderAccessRevocations());
  });
});
