import getOrganisationDelegates from "@/app/actions/organisations/getOrganisationDelegates";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import SroInvite from "./SroInvite";

jest.mock("@/app/actions/organisations/putOrganisationSro", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/getOrganisationDelegates", () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

  describe("appointing an existing delegate", () => {
    const delegate = mockedUser({
      id: 42,
      first_name: "Jane",
      last_name: "Doe",
    });

    beforeEach(() => {
      mockUseStore({
        config: {
          organisation: { ...organisation, claimed_sro: null },
        },
      });
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({
        data: [delegate],
      });
      (putOrganisationSro as jest.Mock).mockResolvedValue({ data: null });
    });

    const chooseDelegateAndSubmit = async () => {
      const { user } = setupTest({ hasSroAssigned: false });

      fireEvent.click(
        screen.getByRole("radio", { name: "Select from existing Delegates" })
      );
      await user.click(screen.getByRole("combobox"));
      await user.click(await screen.findByRole("option", { name: "Jane Doe" }));
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      return user;
    };

    it("asks for confirmation before appointing", async () => {
      await chooseDelegateAndSubmit();

      expect(await screen.findByText("Appoint a new SRO?")).toBeInTheDocument();
      expect(putOrganisationSro).not.toHaveBeenCalled();
    });

    it("appoints the chosen delegate once confirmed", async () => {
      const user = await chooseDelegateAndSubmit();

      await user.click(
        await screen.findByRole("button", { name: "Appoint as SRO" })
      );

      await waitFor(() => {
        expect(putOrganisationSro).toHaveBeenCalledWith(organisation.id, 42);
      });
      expect(
        await screen.findByText("Jane Doe is now your Organisation's SRO.")
      ).toBeInTheDocument();
    });

    it("does not appoint anyone when cancelled", async () => {
      const user = await chooseDelegateAndSubmit();

      await user.click(await screen.findByRole("button", { name: "Cancel" }));

      expect(putOrganisationSro).not.toHaveBeenCalled();
    });

    it("shows an error when the appointment is refused", async () => {
      (putOrganisationSro as jest.Mock).mockRejectedValue(
        new Error("Forbidden")
      );
      const user = await chooseDelegateAndSubmit();

      await user.click(
        await screen.findByRole("button", { name: "Appoint as SRO" })
      );

      expect(
        await screen.findByText(/We couldn't appoint the SRO/)
      ).toBeInTheDocument();
    });

    it("does not appoint anyone when inviting a new person", async () => {
      const { user } = setupTest({ hasSroAssigned: false });

      await user.type(screen.getByLabelText(/First name/), "Sam");
      await user.type(screen.getByLabelText(/Last name/), "Senior");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(screen.queryByText("Appoint a new SRO?")).not.toBeInTheDocument();
      expect(putOrganisationSro).not.toHaveBeenCalled();
    });
  });
});
