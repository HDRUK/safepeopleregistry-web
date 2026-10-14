import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { fireEvent, render, screen } from "@/utils/testUtils";
import SroInvite from "./SroInvite";

function setupTest({
  hasSroAssigned = false,
}: { hasSroAssigned?: boolean } = {}) {
  return render(<SroInvite hasSroAssigned={hasSroAssigned} />);
}

const organisation = mockedOrganisation();

describe("<SroInvite />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when no SRO is assigned yet", () => {
    beforeEach(() => {
      mockUseStore({
        config: {
          organisation: { ...organisation, claimed_sro: null },
        },
      });
    });

    it("renders the invite-an-SRO content instead of the full form", () => {
      setupTest({ hasSroAssigned: false });

      expect(
        screen.getByText(/There's no SRO currently assigned/)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last name/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Invite & Save" })
      ).toBeInTheDocument();
    });

    it("keeps the send invite button enabled as a placeholder", () => {
      setupTest({ hasSroAssigned: false });

      expect(
        screen.getByRole("button", { name: "Invite & Save" })
      ).toBeEnabled();
    });

    it("defaults to the 'enter new SRO details' mode", () => {
      setupTest({ hasSroAssigned: false });

      expect(
        screen.getByRole("radio", { name: "Enter new SRO details" })
      ).toBeChecked();
      expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    });

    it("switches to a delegate picker when 'select from existing Delegates' is chosen", () => {
      setupTest({ hasSroAssigned: false });

      fireEvent.click(
        screen.getByRole("radio", { name: "Select from existing Delegates" })
      );

      expect(screen.queryByLabelText(/First name/)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Last name/)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Email address/)).not.toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  describe("when a claimed SRO is assigned", () => {
    const claimedSro = mockedUser({
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      role: "Head of Research",
    });

    beforeEach(() => {
      mockUseStore({
        config: { organisation: { ...organisation, claimed_sro: claimedSro } },
      });
    });

    it("shows the claimed SRO's details", () => {
      setupTest({ hasSroAssigned: true });

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("Head of Research")).toBeInTheDocument();
    });

    it("does not offer to resend an invite", () => {
      setupTest({ hasSroAssigned: true });

      expect(
        screen.queryByText(/Invite successfully sent on/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Reinvite & Save" })
      ).not.toBeInTheDocument();
    });

    it("only offers to go back", () => {
      setupTest({ hasSroAssigned: true });

      expect(
        screen.getByRole("link", { name: "Previous" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Save" })
      ).not.toBeInTheDocument();
    });
  });
});
