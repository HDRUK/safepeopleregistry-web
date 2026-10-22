import getOrganisationDelegates from "@/app/actions/organisations/getOrganisationDelegates";
import postOrganisationSroInvite from "@/app/actions/organisations/postOrganisationSroInvite";
import postOrganisationSroResendInvite from "@/app/actions/organisations/postOrganisationSroResendInvite";
import putOrganisationSro from "@/app/actions/organisations/putOrganisationSro";
import getUser from "@/app/actions/users/getUser";
import { mockedDepartment } from "@/mocks/data/departments";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { formatDisplayLongDate } from "@/utils/date";
import { fireEvent, render, screen, waitFor, within } from "@/utils/testUtils";
import SroDetailsPanel from "./SroDetailsPanel";

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

jest.mock("@/app/actions/users/getUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/getOrganisationDelegates", () => ({
  __esModule: true,
  default: jest.fn(),
}));

function setupTest() {
  return render(<SroDetailsPanel />);
}

const organisation = mockedOrganisation();

describe("<SroDetailsPanel />", () => {
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
      expect(
        screen.getByRole("combobox", { name: "Select department" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Job title/)).toBeInTheDocument();
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
      role: "Head of Research",
      departments: [mockedDepartment({ id: 7, name: "Clinical Research" })],
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

    it("shows the chosen delegate's details, read-only", async () => {
      const { user } = setupTest();

      fireEvent.click(
        screen.getByRole("radio", { name: "Select from existing Delegates" })
      );
      await user.click(screen.getByRole("combobox"));
      await user.click(await screen.findByRole("option", { name: "Jane Doe" }));

      expect(screen.getByLabelText("Department")).toHaveValue(
        "Clinical Research"
      );
      expect(screen.getByLabelText("Department")).toBeDisabled();
      expect(screen.getByLabelText("Job title")).toHaveValue(
        "Head of Research"
      );
      expect(screen.getByLabelText("Job title")).toBeDisabled();
    });

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
      await user.type(screen.getByLabelText(/Job title/), "Head of Research");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(screen.queryByText("Appoint a new SRO?")).not.toBeInTheDocument();
      expect(putOrganisationSro).not.toHaveBeenCalled();
    });

    it("only offers delegates who have created their account", async () => {
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({
        data: [
          delegate,
          mockedUser({
            id: 43,
            first_name: "Ivy",
            last_name: "Invited",
            unclaimed: true,
          }),
        ],
      });
      const { user } = setupTest();

      fireEvent.click(
        screen.getByRole("radio", { name: "Select from existing Delegates" })
      );
      await user.click(screen.getByRole("combobox"));

      expect(
        await screen.findByRole("option", { name: "Jane Doe" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("option", { name: "Ivy Invited" })
      ).not.toBeInTheDocument();
    });
  });

  describe("inviting a new SRO", () => {
    beforeEach(() => {
      mockUseStore({
        config: {
          organisation: {
            ...organisation,
            claimed_sro: null,
            departments: [
              mockedDepartment({ id: 7, name: "Clinical Research" }),
            ],
          },
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
      await user.click(
        screen.getByRole("combobox", { name: "Select department" })
      );
      await user.click(
        await screen.findByRole("option", { name: "Clinical Research" })
      );
      await user.type(screen.getByLabelText(/Job title/), "Head of Research");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      return user;
    };

    it("requires a job title", async () => {
      const { user } = setupTest();

      await user.type(screen.getByLabelText(/First name/), "Sam");
      await user.type(screen.getByLabelText(/Last name/), "Senior");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(
        await screen.findByText("Job title is required")
      ).toBeInTheDocument();
      expect(screen.queryByText("Invite a new SRO?")).not.toBeInTheDocument();
    });

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
            role: "Head of Research",
            department_id: 7,
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
      await user.type(screen.getByLabelText(/Job title/), "Head of Research");
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

    it("warns that the invitee will join as a delegate if an existing delegate is appointed", async () => {
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({
        data: [
          mockedUser({ id: 44, first_name: "Dana", last_name: "Delegate" }),
        ],
      });
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite someone else instead" })
      );
      fireEvent.click(
        screen.getByRole("radio", { name: "Select from existing Delegates" })
      );
      await user.click(screen.getByRole("combobox"));
      await user.click(
        await screen.findByRole("option", { name: "Dana Delegate" })
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(
        await screen.findByText(
          /Sam Senior's invitation will still work, but they'll join as a Delegate instead/
        )
      ).toBeInTheDocument();
    });
  });

  describe("when the signed-in user is the claimed SRO", () => {
    const sro = mockedUser({
      id: 7,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
    });
    const delegate = mockedUser({
      id: 42,
      first_name: "Sam",
      last_name: "Senior",
    });

    const replacement = {
      ...mockedUser({
        first_name: "Alex",
        last_name: "Next",
        email: "alex.next@example.com",
      }),
      pending_sro_invite: { invite_sent_at: "2026-10-01 09:00:00" },
    };

    const mockStore = (
      signedIn: typeof sro,
      pendingSro: typeof replacement | null = null
    ) =>
      mockUseStore({
        config: {
          organisation: {
            ...organisation,
            claimed_sro: sro,
            pending_sro: pendingSro,
          },
          user: signedIn,
        },
      });

    beforeEach(() => {
      mockStore(sro);
      (getOrganisationDelegates as jest.Mock).mockResolvedValue({
        data: [delegate],
      });
      (putOrganisationSro as jest.Mock).mockResolvedValue({ data: null });
      (getUser as jest.Mock).mockResolvedValue({
        data: { ...sro, is_sro: false },
      });
    });

    const chooseDelegate = async () => {
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Hand over to a delegate" })
      );
      await user.click(screen.getByRole("combobox"));
      await user.click(
        await screen.findByRole("option", { name: "Sam Senior" })
      );

      return user;
    };

    it("lets the SRO download and upload the SRO declaration", () => {
      setupTest();

      expect(
        screen.getByRole("link", { name: "Download SRO Declaration Form" })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Upload SRO Declaration Form")
      ).toBeInTheDocument();
    });

    it("only shows the SRO declaration to the SRO themselves", () => {
      mockStore(delegate);

      setupTest();

      expect(
        screen.queryByRole("link", { name: "Download SRO Declaration Form" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Upload SRO Declaration Form")
      ).not.toBeInTheDocument();
    });

    it("only offers the handover to the SRO themselves", () => {
      mockStore(delegate);

      setupTest();

      expect(
        screen.queryByRole("button", { name: "Hand over to a delegate" })
      ).not.toBeInTheDocument();
    });

    it("needs a delegate to be chosen before handing over", async () => {
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Hand over to a delegate" })
      );

      expect(screen.getByRole("button", { name: "Hand over" })).toBeDisabled();
    });

    it("asks for confirmation before handing over", async () => {
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));

      expect(
        await screen.findByText("Hand over the SRO role?")
      ).toBeInTheDocument();
      expect(putOrganisationSro).not.toHaveBeenCalled();
    });

    it("hands the role over once confirmed", async () => {
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));
      await user.click(
        within(await screen.findByRole("dialog")).getByRole("button", {
          name: "Hand over",
        })
      );

      await waitFor(() => {
        expect(putOrganisationSro).toHaveBeenCalledWith(organisation.id, 42);
      });
      expect(
        await screen.findByText(
          "Sam Senior is now your Organisation's SRO, and you are now a Delegate."
        )
      ).toBeInTheDocument();
    });

    it("refreshes the signed-in user, who is now a delegate", async () => {
      // The rest of the app reads the user's role from the store, which the layout only
      // fills on a full page load.
      const setUser = jest.fn();
      mockUseStore({
        setUser,
        config: {
          organisation: {
            ...organisation,
            claimed_sro: sro,
            pending_sro: null,
          },
          user: sro,
        },
      });
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));
      await user.click(
        within(await screen.findByRole("dialog")).getByRole("button", {
          name: "Hand over",
        })
      );

      await waitFor(() => {
        expect(getUser).toHaveBeenCalledWith(sro.id, expect.anything());
        expect(setUser).toHaveBeenCalledWith({ ...sro, is_sro: false });
      });
    });

    it("does not hand over when cancelled", async () => {
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));
      await user.click(
        within(await screen.findByRole("dialog")).getByRole("button", {
          name: "Cancel",
        })
      );

      expect(putOrganisationSro).not.toHaveBeenCalled();
    });

    it("shows an error when the handover is refused", async () => {
      (putOrganisationSro as jest.Mock).mockRejectedValue(
        new Error("Forbidden")
      );
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));
      await user.click(
        within(await screen.findByRole("dialog")).getByRole("button", {
          name: "Hand over",
        })
      );

      expect(
        await screen.findByText(/We couldn't hand over the SRO role/)
      ).toBeInTheDocument();
    });

    it("offers to invite a replacement", async () => {
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite a replacement" })
      );

      expect(
        screen.getByText(/You stay the SRO until they create their account/)
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("radio", { name: "Select from existing Delegates" })
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Cancel inviting a replacement" })
      );
      expect(
        screen.getByRole("button", { name: "Invite a replacement" })
      ).toBeInTheDocument();
    });

    it("invites a replacement once confirmed", async () => {
      (postOrganisationSroInvite as jest.Mock).mockResolvedValue({
        ok: true,
        status: 201,
      });
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite a replacement" })
      );
      await user.type(screen.getByLabelText(/First name/), "Alex");
      await user.type(screen.getByLabelText(/Last name/), "Next");
      await user.type(screen.getByLabelText(/Job title/), "Research Lead");
      await user.type(
        screen.getByLabelText(/Email address/),
        "alex.next@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(
        await screen.findByText(
          /Alex Next will be emailed an invitation to replace you/
        )
      ).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Send invite" }));

      await waitFor(() => {
        expect(postOrganisationSroInvite).toHaveBeenCalledWith(
          organisation.id,
          {
            first_name: "Alex",
            last_name: "Next",
            email: "alex.next@example.com",
            role: "Research Lead",
            department_id: undefined,
          },
          { suppressThrow: true }
        );
      });
    });

    it("shows the pending replacement under the SRO, with resend", async () => {
      mockStore(sro, replacement);
      (postOrganisationSroResendInvite as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
      });
      const { user } = setupTest();

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("Alex Next")).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Invite a replacement" })
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: "Resend invitation" })
      );

      await waitFor(() => {
        expect(postOrganisationSroResendInvite).toHaveBeenCalledWith(
          organisation.id,
          { suppressThrow: true }
        );
      });
    });

    it("warns that a pending replacement will join as a delegate if someone else is invited", async () => {
      mockStore(sro, replacement);
      const { user } = setupTest();

      await user.click(
        screen.getByRole("button", { name: "Invite someone else instead" })
      );
      await user.type(screen.getByLabelText(/First name/), "Sam");
      await user.type(screen.getByLabelText(/Last name/), "Senior");
      await user.type(screen.getByLabelText(/Job title/), "Head of Research");
      await user.type(
        screen.getByLabelText(/Email address/),
        "sam.senior@example.com"
      );
      await user.click(screen.getByRole("button", { name: "Invite & Save" }));

      expect(
        await screen.findByText(
          /Alex Next's invitation will still work, but they'll join as a Delegate instead/
        )
      ).toBeInTheDocument();
    });

    it("does not offer the replacement options to anyone else", () => {
      mockStore(delegate, replacement);

      setupTest();

      expect(
        screen.queryByRole("button", { name: "Invite a replacement" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Resend invitation" })
      ).not.toBeInTheDocument();
    });

    it("warns that a pending replacement will join as a delegate if the role is handed over", async () => {
      mockStore(sro, replacement);
      const user = await chooseDelegate();

      await user.click(screen.getByRole("button", { name: "Hand over" }));

      expect(
        await screen.findByText(
          /Alex Next's invitation will still work, but they'll join as a Delegate instead/
        )
      ).toBeInTheDocument();
    });
  });
});
