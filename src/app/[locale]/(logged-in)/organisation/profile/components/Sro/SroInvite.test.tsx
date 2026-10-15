import getOrganisationDelegates from "@/app/actions/organisations/getOrganisationDelegates";
import postOrganisationSroInvite from "@/app/actions/organisations/postOrganisationSroInvite";
import postOrganisationSroResendInvite from "@/app/actions/organisations/postOrganisationSroResendInvite";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { formatDisplayLongDate } from "@/utils/date";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import SroInvite from "./SroInvite";

jest.mock("@/app/actions/organisations/putOrganisationSro", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/postOrganisationSroInvite", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock(
  "@/app/actions/organisations/postOrganisationSroResendInvite",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

jest.mock("@/app/actions/organisations/getOrganisationDelegates", () => ({
  __esModule: true,
  default: jest.fn(),
}));

function setupTest() {
  return render(<SroInvite />);
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
      setupTest();

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
      setupTest();

      expect(
        screen.getByRole("button", { name: "Invite & Save" })
      ).toBeEnabled();
    });

    it("defaults to the 'enter new SRO details' mode", () => {
      setupTest();

      expect(
        screen.getByRole("radio", { name: "Enter new SRO details" })
      ).toBeChecked();
      expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    });

    it("switches to a delegate picker when 'select from existing Delegates' is chosen", () => {
      setupTest();

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
      setupTest();

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("Head of Research")).toBeInTheDocument();
    });

    it("does not offer to resend an invite", () => {
      setupTest();

      expect(
        screen.queryByText(/Invite successfully sent on/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Reinvite & Save" })
      ).not.toBeInTheDocument();
    });

    it("only offers to go back", () => {
      setupTest();

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
      const { user } = setupTest();

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
      const { user } = setupTest();

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

  describe("inviting a new SRO", () => {
    beforeEach(() => {
      mockUseStore({
        config: {
          organisation: { ...organisation, claimed_sro: null },
        },
      });
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({ data: [] });
      (postOrganisationSroInvite as jest.Mock).mockResolvedValue({
        ok: true,
        status: 201,
        data: 99,
      });
    });

    const fillInAndSubmit = async () => {
      const { user } = setupTest();

      await user.type(screen.getByLabelText(/First name/), "Sam");
      await user.type(screen.getByLabelText(/Last name/), "Senior");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      return user;
    };

    it("asks for confirmation before sending the invitation", async () => {
      await fillInAndSubmit();

      expect(await screen.findByText("Invite a new SRO?")).toBeInTheDocument();
      expect(postOrganisationSroInvite).not.toHaveBeenCalled();
    });

    it("sends the invitation once confirmed", async () => {
      const user = await fillInAndSubmit();

      await user.click(
        await screen.findByRole("button", { name: "Send invite" })
      );

      await waitFor(() => {
        expect(postOrganisationSroInvite).toHaveBeenCalledWith(
          organisation.id,
          {
            first_name: "Sam",
            last_name: "Senior",
            email: "sam.senior@example.com",
          },
          { suppressThrow: true }
        );
      });
      expect(
        await screen.findByText(
          "Sam Senior has been invited to be your Organisation's SRO."
        )
      ).toBeInTheDocument();
    });

    it("does not send the invitation when cancelled", async () => {
      const user = await fillInAndSubmit();

      await user.click(await screen.findByRole("button", { name: "Cancel" }));

      expect(postOrganisationSroInvite).not.toHaveBeenCalled();
    });

    it("explains what to do when the email already has an account", async () => {
      (postOrganisationSroInvite as jest.Mock).mockResolvedValue({
        ok: false,
        status: 409,
      });
      const user = await fillInAndSubmit();

      await user.click(
        await screen.findByRole("button", { name: "Send invite" })
      );

      expect(
        await screen.findByText(/This email address already has an account/)
      ).toBeInTheDocument();
    });

    it("shows a general error when the invitation fails", async () => {
      (postOrganisationSroInvite as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });
      const user = await fillInAndSubmit();

      await user.click(
        await screen.findByRole("button", { name: "Send invite" })
      );

      expect(
        await screen.findByText(/We couldn't send the invitation/)
      ).toBeInTheDocument();
    });
  });

  describe("when an SRO has been invited", () => {
    const pendingSro = {
      ...mockedUser({
        first_name: "Sam",
        last_name: "Senior",
        email: "sam.senior@example.com",
      }),
      pending_sro_invite: { invite_sent_at: "2026-10-01 09:00:00" },
    };

    beforeEach(() => {
      mockUseStore({
        config: {
          organisation: {
            ...organisation,
            claimed_sro: null,
            pending_sro: pendingSro,
          },
        },
      });
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({ data: [] });
      (postOrganisationSroResendInvite as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
      });
    });

    it("shows who was invited and when", () => {
      setupTest();

      expect(screen.getByText("Sam Senior")).toBeInTheDocument();
      expect(screen.getByText("sam.senior@example.com")).toBeInTheDocument();
      expect(
        screen.getByText(
          `Invite successfully sent on ${formatDisplayLongDate("2026-10-01 09:00:00")}`
        )
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/First name/)).not.toBeInTheDocument();
    });

    it("does not show a department or job title for the invitee", () => {
      setupTest();

      expect(screen.queryByText("Department")).not.toBeInTheDocument();
      expect(screen.queryByText("Job title")).not.toBeInTheDocument();
    });

    it("resends the invitation", async () => {
      const { user } = setupTest();

      await user.click(screen.getByRole("button", { name: "Reinvite & Save" }));

      await waitFor(() => {
        expect(postOrganisationSroResendInvite).toHaveBeenCalledWith(
          organisation.id,
          { suppressThrow: true }
        );
      });
      expect(
        await screen.findByText(
          "The invitation has been sent to Sam Senior again."
        )
      ).toBeInTheDocument();
    });

    it("shows an error when the invitation cannot be resent", async () => {
      (postOrganisationSroResendInvite as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      });
      const { user } = setupTest();

      await user.click(screen.getByRole("button", { name: "Reinvite & Save" }));

      expect(
        await screen.findByText(/We couldn't resend the invitation/)
      ).toBeInTheDocument();
    });

    it("lets someone else be invited instead, or the invitation be kept", async () => {
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite someone else instead" })
      );
      expect(screen.getByLabelText(/First name/)).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Keep Sam Senior's invitation" })
      );
      expect(
        screen.getByRole("button", { name: "Reinvite & Save" })
      ).toBeInTheDocument();
    });

    it("warns that the earlier invitee will join as a delegate", async () => {
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite someone else instead" })
      );
      await user.type(screen.getByLabelText(/First name/), "Jane");
      await user.type(screen.getByLabelText(/Last name/), "Doe");
      await user.type(
        screen.getByLabelText(/Email address/),
        "jane.doe@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(
        await screen.findByText(
          /Sam Senior's invitation will still work, but they'll join as a Delegate instead/
        )
      ).toBeInTheDocument();
    });
  });
});
