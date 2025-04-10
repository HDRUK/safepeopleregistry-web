import {
  commonAccessibilityTests,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockedAffiliation } from "@/mocks/data/user";
import { useQuery, useMutation } from "@tanstack/react-query";
import AffiliationsPage from "./AffiliationsPage";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

describe("<AffiliationsPage />", () => {
  const testAffiliation = mockedAffiliation();
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      config: {
        user: { registry_id: 123 },
        histories: { affiliations: [testAffiliation] },
      },
      getHistories: jest.fn(),
      setHistories: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: { data: { data: [testAffiliation] } },
      refetch: jest.fn(),
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useQuery>);

    mockUseMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useMutation>);
  });

  it("renders without crashing", () => {
    render(<AffiliationsPage />);
    expect(
      screen.getByText("Complete your employer or institute information")
    ).toBeInTheDocument();
  });

  it("displays the affiliations table", async () => {
    render(<AffiliationsPage />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("displays organisation name in the table", async () => {
    render(<AffiliationsPage />);
    await waitFor(() => {
      expect(
        screen.getByText(testAffiliation.organisation.organisation_name)
      ).toBeInTheDocument();
    });
  });

  it("displays 7 columns", async () => {
    render(<AffiliationsPage />);
    await waitFor(() => {
      expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<AffiliationsPage />));
  });
});
