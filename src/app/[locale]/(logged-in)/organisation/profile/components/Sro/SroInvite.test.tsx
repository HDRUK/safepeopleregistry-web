import { mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
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
          organisation: { ...organisation, sro_officer: undefined },
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
        screen.getByRole("button", { name: "Send invite" })
      ).toBeInTheDocument();
    });

    it("keeps the send invite button enabled as a placeholder", () => {
      setupTest({ hasSroAssigned: false });

      expect(screen.getByRole("button", { name: "Send invite" })).toBeEnabled();
    });
  });

  describe("when an SRO is already assigned", () => {
    beforeEach(() => {
      mockUseStore({
        config: { organisation },
      });
    });

    it("shows the assigned SRO's details, a resend-invite button and a sent chip", () => {
      setupTest({ hasSroAssigned: true });

      expect(
        screen.getByText(
          new RegExp(
            `${organisation.sro_officer!.first_name} ${organisation.sro_officer!.last_name}`
          )
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Re-send invite" })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Invite successfully sent on/)
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Send invite" })
      ).not.toBeInTheDocument();
    });

    it("still shows the Previous and Save navigation buttons under the invite section", () => {
      setupTest({ hasSroAssigned: true });

      expect(
        screen.getByRole("link", { name: "Previous" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });
});
