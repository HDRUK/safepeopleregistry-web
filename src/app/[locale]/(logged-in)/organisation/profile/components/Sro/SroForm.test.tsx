import getFile from "@/app/actions/files/getFile";
import getOrganisationSroDeclarationDetails from "@/app/actions/organisations/getOrganisationSroDeclarationDetails";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import { mockedSroDeclarationFile } from "@/mocks/data/file";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { FileStatus } from "@/consts/files";
import { File } from "@/types/application";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import SroForm from "./SroForm";

const putProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("@/app/actions/files/getFile");
jest.mock("@/app/actions/organisations/getOrganisationSroDeclarationDetails");

jest.mock("@/app/actions/organisations/putOrganisationSro", () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

// The API hides an organisation's files.
const organisation = mockedOrganisation({ files: undefined });

const mockLatestSroDeclaration = (latest: File | null) => {
  (getOrganisationSroDeclarationDetails as jest.Mock).mockResolvedValue({
    data: latest,
  });
  (getFile as jest.Mock).mockResolvedValue({ data: latest });
};

describe("<SroForm />", () => {
  beforeEach(() => {
    mockUseStore({
      config: { organisation, user: userData },
    });
    mutateUserMock.mockClear();
    putProps.onSubmit.mockClear();
    (putOrganisationSro as jest.Mock).mockResolvedValue({ data: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SRO fields form", () => {
    setupTest();

    expect(screen.getAllByLabelText(/First name/)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Last name/)[0]).toBeInTheDocument();
  });

  const submitForm = async () => {
    const form = await screen.findByRole("form", {
      name: "Senior Responsible Officer (SRO) contact information",
    });
    fireEvent.submit(form);
  };

  it("saves the SRO's details without trying to set is_sro", async () => {
    setupTest();

    await submitForm();

    await waitFor(() => {
      expect(mutateUserMock).toHaveBeenCalledWith(
        expect.objectContaining({ first_name: "first", department_id: 123 })
      );
    });
    expect(mutateUserMock.mock.calls[0][0]).not.toHaveProperty("is_sro");
  });

  it("does not re-appoint an SRO who is updating their own details", async () => {
    setupTest({ isDelegate: false, hasSroAssigned: true });

    await submitForm();

    await waitFor(() => {
      expect(mutateUserMock).toHaveBeenCalled();
    });
    expect(putOrganisationSro).not.toHaveBeenCalled();
  });

  it("does not try to appoint a delegate once an SRO is assigned", async () => {
    setupTest({ isDelegate: true, hasSroAssigned: true });

    await submitForm();

    await waitFor(() => {
      expect(putProps.onSubmit).toHaveBeenCalled();
    });
    expect(putOrganisationSro).not.toHaveBeenCalled();
  });

  it("appoints a delegate as SRO before saving their details", async () => {
    setupTest({ isDelegate: true, hasSroAssigned: false });

    await submitForm();

    await waitFor(() => {
      expect(mutateUserMock).toHaveBeenCalled();
    });
    expect(putOrganisationSro).toHaveBeenCalledWith(
      organisation.id,
      userData.id
    );
    expect(
      (putOrganisationSro as jest.Mock).mock.invocationCallOrder[0]
    ).toBeLessThan(putProps.onSubmit.mock.invocationCallOrder[0]);
  });

  it("saves nothing and shows an error when the appointment is refused", async () => {
    (putOrganisationSro as jest.Mock).mockRejectedValue(new Error("Forbidden"));
    setupTest({ isDelegate: true, hasSroAssigned: false });

    await submitForm();

    expect(
      await screen.findByText(/We couldn't make you the SRO/)
    ).toBeInTheDocument();
    expect(putProps.onSubmit).not.toHaveBeenCalled();
    expect(mutateUserMock).not.toHaveBeenCalled();
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

  it("shows a pending-approval chip when no SRO declaration has been uploaded yet", async () => {
    mockLatestSroDeclaration(null);

    setupTest();

    await waitFor(() =>
      expect(getOrganisationSroDeclarationDetails).toHaveBeenCalled()
    );
    expect(
      screen.getByText("SRO declaration pending approval")
    ).toBeInTheDocument();
  });

  it.each([FileStatus.PENDING, FileStatus.FAILED])(
    "shows a pending-approval chip while the latest SRO declaration is %s",
    async status => {
      mockLatestSroDeclaration(
        mockedSroDeclarationFile({ id: 1, name: "declaration.pdf", status })
      );

      setupTest();

      // Wait for the declaration to load before checking the chip.
      expect(await screen.findByText("declaration.pdf")).toBeInTheDocument();
      expect(
        screen.getByText("SRO declaration pending approval")
      ).toBeInTheDocument();
    }
  );

  it("shows an approved chip with the processed date once the latest SRO declaration has been processed", async () => {
    mockLatestSroDeclaration(
      mockedSroDeclarationFile({
        id: 1,
        name: "declaration.pdf",
        status: FileStatus.PROCESSED,
        created_at: "2026-01-01",
        updated_at: "2026-01-15T13:00:00",
      })
    );

    setupTest();

    expect(
      await screen.findByText(
        /SRO declaration approved on 15 Jan 2026 at 13:00/
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("SRO declaration pending approval")
    ).not.toBeInTheDocument();
  });
});
