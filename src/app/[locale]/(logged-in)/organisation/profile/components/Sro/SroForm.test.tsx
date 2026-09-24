import { mockedOrganisation } from "@/mocks/data/organisation";
import { FileStatus, FileType } from "@/consts/files";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import SroForm from "./SroForm";

const putProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("../../hooks/useUpdateOrganisation", () => ({
  __esModule: true,
  default: () => putProps,
}));

const mutateUserMock = jest.fn().mockResolvedValue(null);
jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: jest.fn(() => ({
      mutateAsync: mutateUserMock,
    })),
  };
});

function setupTest({
  isDelegate = false,
  hasSroAssigned = true,
}: { isDelegate?: boolean; hasSroAssigned?: boolean } = {}) {
  return render(
    <SroForm isDelegate={isDelegate} hasSroAssigned={hasSroAssigned} />
  );
}

const userData = {
  id: 1,
  first_name: "first",
  last_name: "last",
  email: "email@example.com",
  role: "SRO",
  departments: [{ id: 123, name: "Research" }],
};

const organisation = mockedOrganisation();

describe("<SroForm />", () => {
  beforeEach(() => {
    mockUseStore({
      config: { organisation, user: userData },
    });
    mutateUserMock.mockClear();
    putProps.onSubmit.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SRO fields form", () => {
    setupTest();

    expect(screen.getAllByLabelText(/First name/)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Last name/)[0]).toBeInTheDocument();
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", {
      name: "Senior Responsible Officer (SRO) contact information",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mutateUserMock).toHaveBeenCalledWith(
        expect.objectContaining({ is_sro: true })
      );
    });
  });

  it("makes the fields read-only for a delegate once an SRO is assigned", () => {
    mockUseStore({
      config: {
        organisation,
        user: { ...userData, is_delegate: 1 },
      },
    });

    setupTest({ isDelegate: true, hasSroAssigned: true });

    expect(screen.queryByLabelText(/First name/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("keeps the fields editable for a delegate when no SRO is assigned yet", () => {
    mockUseStore({
      config: {
        organisation: { ...organisation, sro_officer: undefined },
        user: { ...userData, is_delegate: 1 },
      },
    });

    setupTest({ isDelegate: true, hasSroAssigned: false });

    expect(screen.getAllByLabelText(/First name/)[0]).toBeInTheDocument();
  });

  it("shows a pending-approval chip when no SRO declaration has been uploaded yet", () => {
    setupTest();

    expect(
      screen.getByText("SRO declaration pending approval")
    ).toBeInTheDocument();
  });

  it("shows an approved chip with the processed date once the SRO declaration has been processed", () => {
    mockUseStore({
      config: {
        organisation: {
          ...organisation,
          files: [
            {
              id: 1,
              name: "declaration.pdf",
              path: "",
              status: FileStatus.PROCESSED,
              type: FileType.DECLARATION_SRO,
              created_at: "2026-01-01",
              updated_at: "2026-01-15T13:00:00",
            },
          ],
        },
        user: userData,
      },
    });

    setupTest();

    expect(
      screen.queryByText("SRO declaration pending approval")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/SRO declaration approved on 15 Jan 2026 at 13:00/)
    ).toBeInTheDocument();
  });
});
