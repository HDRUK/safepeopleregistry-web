import { AffiliationEndDateSource } from "@/consts/user";
import { mockedAffiliation } from "@/mocks/data/user";
import { EntityType } from "@/types/api";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import AffiliationEndDateModal, {
  AffiliationEndDateModalProps,
} from "./AffiliationEndDateModal";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;
const mockMutateAsync = jest.fn();
const mockOnClose = jest.fn();

const affiliation = mockedAffiliation({
  id: 12,
  from: "2020-01-01",
  to: "2099-12-31",
  organisation: { organisation_name: "Example Organisation" },
});

const renderModal = (props?: Partial<AffiliationEndDateModalProps>) =>
  render(
    <AffiliationEndDateModal
      open
      affiliation={affiliation}
      entityType={EntityType.ORGANISATION}
      userName="Jane Doe"
      onClose={mockOnClose}
      {...props}
    />
  );

describe("<AffiliationEndDateModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMutation.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useMutation>);
  });

  it("asks an Organisation to record a leaver", () => {
    renderModal();

    expect(screen.getByText("Record leaver")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Record when Jane Doe left, or will leave, Example Organisation."
      )
    ).toBeInTheDocument();
  });

  it("records the end date", async () => {
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        params: { affiliationId: 12 },
        payload: { to: "2099-12-31" },
      });
    });
  });

  it("removes a future end date", async () => {
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Remove end date" }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        params: { affiliationId: 12 },
        payload: { to: null },
      });
    });
  });

  it("does not let a user change the Organisation's end date", () => {
    renderModal({
      entityType: EntityType.USER,
      affiliation: {
        ...affiliation,
        end_date_source: AffiliationEndDateSource.ORGANISATION,
      },
    });

    expect(screen.getByText(/so only they can change it/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Save" })
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderModal());
  });
});
