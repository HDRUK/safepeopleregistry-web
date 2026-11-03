import postOrganisationInvite from "@/app/actions/organisations/postOrganisationInvite";
import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import { useTranslations } from "next-intl";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import InviteOrganisationModal from "./InviteOrganisationModal";

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: () => ({ isSroRequirementEnabled: true }),
}));

jest.mock("@/app/actions/organisations/postOrganisationUnclaimed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/postOrganisationInvite", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedPostOrganisationUnclaimed = jest.mocked(postOrganisationUnclaimed);
const mockedPostOrganisationInvite = jest.mocked(postOrganisationInvite);

const mockOnSuccess = jest.fn();

const TestInviteOrganisationModal = () => {
  const t = useTranslations("Organisations.InviteSponsor");

  return (
    <InviteOrganisationModal
      open
      onClose={jest.fn()}
      onSuccess={mockOnSuccess}
      t={t}
    />
  );
};

const submitInvite = async () => {
  render(<TestInviteOrganisationModal />);

  fireEvent.change(screen.getByRole("textbox", { name: "Organisation name" }), {
    target: { value: "Example Organisation" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
    target: { value: "lead@example.com" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Invite" }));
};

describe("<InviteOrganisationModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedPostOrganisationInvite.mockResolvedValue({
      ok: true,
      status: 200,
      message: "success",
      data: null,
    } as never);
  });

  it("calls onSuccess with the new Organisation id", async () => {
    mockedPostOrganisationUnclaimed.mockResolvedValue({
      ok: true,
      status: 201,
      message: "success",
      data: 1,
    } as never);

    await submitInvite();

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith(1);
    });
  });

  it.each([
    ["duplicate", /This Organisation has already been invited/],
    ["email_in_use", /already the lead applicant for another Organisation/],
  ])("shows why a %s conflict failed", async (reason, text) => {
    mockedPostOrganisationUnclaimed.mockResolvedValue({
      ok: false,
      status: 409,
      message: "conflict",
      data: reason,
    } as never);

    await submitInvite();

    expect(await screen.findByText(text)).toBeInTheDocument();
    expect(mockedPostOrganisationInvite).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it("shows the generic error for any other failure", async () => {
    mockedPostOrganisationUnclaimed.mockResolvedValue({
      ok: false,
      status: 500,
      message: "failed",
      data: null,
    } as never);

    await submitInvite();

    expect(
      await screen.findByText(/There has been a problem with your request/)
    ).toBeInTheDocument();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
