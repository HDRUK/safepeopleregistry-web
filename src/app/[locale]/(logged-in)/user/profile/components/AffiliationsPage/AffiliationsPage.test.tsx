import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { Status } from "@/consts/application";
import { OrganisationConflictError } from "@/utils/organisationConflictError";
import { mockedAffiliation } from "@/mocks/data/user";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mockPagedResults } from "jest.utils";
import AffiliationsPage from "./AffiliationsPage";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("@/data/store", () => ({
  useStore: jest.fn(),
}));

const mockUseOrganisationInvite = jest.fn();

jest.mock("@/queries/useOrganisationInvite", () => ({
  __esModule: true,
  default: (props: unknown) => mockUseOrganisationInvite(props),
}));

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

const renderTest = () => {
  return render(<AffiliationsPage queryState={{}} />);
};

describe("<AffiliationsPage />", () => {
  const testAffiliations = [
    mockedAffiliation(),
    mockedAffiliation({
      organisation: {
        organisation_name: "Second Organisation Name",
      },
    }),
  ];
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseStore({
      config: {
        user: { registry_id: 123 },
        histories: { affiliations: testAffiliations },
      },
      getHistories: jest.fn(),
      setHistories: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: { data: mockPagedResults(testAffiliations) },
      refetch: jest.fn(),
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useQuery>);

    mockUseMutation.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useMutation>);

    mockUseOrganisationInvite.mockReturnValue({
      queryState: {},
      handleSubmit: jest.fn(),
      mutateOrganisationInvite: jest.fn(),
    });
  });

  describe("when the employer or institute cannot be created", () => {
    const reportInviteError = (error: unknown) => {
      const { onError } = mockUseOrganisationInvite.mock.lastCall[0];

      act(() => {
        onError(error);
      });
    };

    it.each([
      ["duplicate", /This Organisation has already been invited/],
      ["email_in_use", /already the lead applicant for another Organisation/],
      ["claimed_duplicate", /is already registered/],
      ["unclaimed_duplicate", /has already been invited and has not yet/],
      [
        "claimed_duplicate_without_email",
        /with this name is already registered/,
      ],
      [
        "unclaimed_duplicate_without_email",
        /with this name has already been invited/,
      ],
    ] as const)("shows why a %s conflict failed", async (reason, text) => {
      renderTest();

      reportInviteError(new OrganisationConflictError(reason));

      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(screen.queryByText(/An error occurred/)).not.toBeInTheDocument();
    });

    it("shows the generic error for any other failure", async () => {
      renderTest();

      reportInviteError(new Error("postOrganisationUnclaimedError"));

      expect(await screen.findByText(/An error occurred/)).toBeInTheDocument();
    });
  });

  it("renders without crashing", () => {
    renderTest();

    expect(
      screen.getByText("Complete your employer or institute information")
    ).toBeInTheDocument();
  });

  it("displays the affiliations table", async () => {
    renderTest();

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("displays organisation name in the table", async () => {
    renderTest();

    await waitFor(() => {
      expect(
        screen.getByText(testAffiliations[0].organisation.organisation_name)
      ).toBeInTheDocument();
    });
  });

  it("displays 7 columns", async () => {
    renderTest();

    await waitFor(() => {
      expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    });
  });

  it("offers a left affiliation as a new affiliation, not an edit", async () => {
    mockUseQuery.mockReturnValue({
      data: {
        data: mockPagedResults([
          mockedAffiliation({
            model_state: { state: { slug: Status.AFFILIATION_LEFT } },
          }),
        ]),
      },
      refetch: jest.fn(),
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useQuery>);

    renderTest();

    fireEvent.click(await screen.findByRole("button", { name: "Actions" }));

    expect(screen.getByText("Add as a new affiliation")).toBeInTheDocument();
    expect(screen.queryByText("View or edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Record end date")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("only lets an affiliated affiliation have its end date recorded", async () => {
    mockUseQuery.mockReturnValue({
      data: { data: mockPagedResults([mockedAffiliation()]) },
      refetch: jest.fn(),
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useQuery>);

    renderTest();

    fireEvent.click(await screen.findByRole("button", { name: "Actions" }));

    expect(screen.getByText("Record end date")).toBeInTheDocument();
    expect(screen.queryByText("View or edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderTest());
  });
});
