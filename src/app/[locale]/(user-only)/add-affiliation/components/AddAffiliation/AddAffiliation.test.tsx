import { Status } from "@/consts/application";
import { mockedRegistrationAffiliation, mockedUser } from "@/mocks/data/user";
import { ResearcherAffiliation, User } from "@/types/application";
import { handleLogout } from "@/utils/keycloak";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useStore } from "@/data/store";
import { useRouter } from "next/navigation";
import AddAffiliation from "@/app/[locale]/(user-only)/add-affiliation/components/AddAffiliation/AddAffiliation";

const mockFormProps = jest.fn();
const mockSubmittedFields = {
  organisation_id: 99,
  member_id: "A1234567",
  role: "Researcher",
} as unknown as ResearcherAffiliation;

jest.mock(
  "@/app/[locale]/(logged-in)/user/profile/components/AffiliationsForm",
  () => ({
    __esModule: true,
    default: (props: { onSubmit: (fields: unknown) => void }) => {
      mockFormProps(props);

      return (
        <button
          type="button"
          onClick={() => props.onSubmit(mockSubmittedFields)}>
          Save affiliation
        </button>
      );
    },
  })
);

jest.mock(
  "@/app/[locale]/(user-only)/add-affiliation/components/CheckYourEmail",
  () => ({
    __esModule: true,
    default: () => <p>Check your email view</p>,
  })
);

const mockSubmitAffiliation = jest.fn();

jest.mock("@/hooks/useSubmitAffiliation", () => ({
  __esModule: true,
  default: () => ({
    submitAffiliation: mockSubmitAffiliation,
    queryState: {},
    postAffiliationQueryState: {},
    putAffiliationQueryState: {},
  }),
}));

const mockInvalidateQueries = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({ invalidateQueries: mockInvalidateQueries }),
}));

jest.mock("@/utils/keycloak", () => ({
  handleLogout: jest.fn(),
}));

const mockRefresh = jest.fn();

const renderWithUser = (user: Partial<User>) => {
  const state = { getUser: () => mockedUser(user) };
  (useStore as unknown as jest.Mock).mockImplementation(
    (selector: (s: typeof state) => unknown) => selector(state)
  );

  return render(<AddAffiliation />);
};

const lastFormProps = () => mockFormProps.mock.lastCall?.[0];

describe("<AddAffiliation />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });
    mockSubmitAffiliation.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("asks a researcher without an affiliation to add one", () => {
    renderWithUser({ registration_affiliation: null });

    expect(
      screen.getByRole("heading", { name: "Add your current affiliation" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you need a current affiliation/)
    ).toBeInTheDocument();
    expect(lastFormProps().initialValues).toBeUndefined();
    expect(lastFormProps().lockOrganisation).toBeFalsy();
  });

  it("prefills and locks an invited researcher's organisation and email", () => {
    const invited = mockedRegistrationAffiliation({
      id: 7,
      organisation_id: 3,
      organisation_name: "Example University",
      email: "invited@university.example.com",
    });

    renderWithUser({ registration_affiliation: invited });

    expect(
      screen.getByText(/Example University has invited you/)
    ).toBeInTheDocument();
    expect(lastFormProps().initialValues).toEqual(
      expect.objectContaining({
        id: 7,
        organisation_id: 3,
        email: "invited@university.example.com",
      })
    );
    expect(lastFormProps().lockOrganisation).toBe(true);
  });

  it("saves a new affiliation, then reloads the user and the page", async () => {
    renderWithUser({ registration_affiliation: null });

    fireEvent.click(screen.getByRole("button", { name: "Save affiliation" }));

    await waitFor(() => expect(mockRefresh).toHaveBeenCalled());
    expect(mockSubmitAffiliation).toHaveBeenCalledWith(
      mockSubmittedFields,
      undefined
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["getMe"],
    });
  });

  it("completes the invited affiliation with the inviting organisation", async () => {
    renderWithUser({
      registration_affiliation: mockedRegistrationAffiliation({
        id: 7,
        organisation_id: 3,
      }),
    });

    fireEvent.click(screen.getByRole("button", { name: "Save affiliation" }));

    await waitFor(() => expect(mockRefresh).toHaveBeenCalled());
    expect(mockSubmitAffiliation).toHaveBeenCalledWith(
      { ...mockSubmittedFields, organisation_id: 3 },
      7
    );
  });

  it("stays put when the affiliation couldn't be saved", async () => {
    mockSubmitAffiliation.mockResolvedValue(false);
    renderWithUser({ registration_affiliation: null });

    fireEvent.click(screen.getByRole("button", { name: "Save affiliation" }));

    await waitFor(() => expect(mockSubmitAffiliation).toHaveBeenCalled());
    expect(mockInvalidateQueries).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("asks a researcher waiting on email verification to check their email", () => {
    renderWithUser({
      registration_affiliation: mockedRegistrationAffiliation({
        state: Status.AFFILIATION_EMAIL_VERIFY,
      }),
    });

    expect(screen.getByText("Check your email view")).toBeInTheDocument();
    expect(mockFormProps).not.toHaveBeenCalled();
  });

  it("lets the researcher sign out", () => {
    renderWithUser({ registration_affiliation: null });

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    expect(handleLogout).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      renderWithUser({ registration_affiliation: null })
    );
  });
});
