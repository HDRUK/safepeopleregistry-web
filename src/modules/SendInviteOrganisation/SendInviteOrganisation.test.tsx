import { faker } from "@faker-js/faker";
import { mock200Json, mockFailedJson } from "jest.utils";
import { mockedOrganisation } from "@/mocks/data/organisation";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import SendInviteOrganisation, {
  SendInviteOrganisationProps,
} from "./SendInviteOrganisation";

const mockUseFeatures = jest.fn(() => ({}));

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: () => mockUseFeatures(),
}));

const organisation = mockedOrganisation();

const renderSendInviteOrganisation = (
  props?: Partial<SendInviteOrganisationProps>
) => render(<SendInviteOrganisation {...props} />);

const renderSubmitted = async () => {
  renderSendInviteOrganisation();

  [/Name/i, /Email/i].forEach(name => {
    const input = screen.getByRole("textbox", { name });
    const inputValue = faker.internet.email();

    fireEvent.change(input, {
      target: { value: inputValue },
    });
  });

  const button = screen.getByRole("button", { name: /invite/i });

  await act(() => {
    fireEvent.submit(button);
  });
};

describe("<SendInviteOrganisation />", () => {
  it("submits the invite", async () => {
    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/You have successfully invited the Organisation/i)
      ).toBeTruthy();
    });
  });

  it("shows error when submit fails", async () => {
    global.fetch.mockImplementation((url: string) => {
      if (url.endsWith(`/organisations`)) {
        return mock200Json(1);
      }

      return mockFailedJson(null);
    });

    await renderSubmitted();

    await waitFor(() => {
      expect(
        screen.getByText(/There was an error inviting the Organisation/i)
      ).toBeTruthy();
    });
  });

  it("prefills and invites an existing organisation", async () => {
    global.fetch.mockImplementation(() => mock200Json(null));

    renderSendInviteOrganisation({ organisation });

    expect(screen.getByRole("textbox", { name: /Name/i })).toHaveValue(
      organisation.organisation_name
    );
    expect(screen.getByRole("textbox", { name: /Email/i })).toHaveValue(
      organisation.lead_applicant_email
    );

    const button = screen.getByRole("button", { name: /invite/i });

    await act(() => {
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/You have successfully invited the Organisation/i)
      ).toBeTruthy();
    });
  });

  describe("when inviting an Organisation directly", () => {
    beforeEach(() => {
      mockUseFeatures.mockReturnValue({ isSroRequirementEnabled: true });
    });

    afterEach(() => {
      mockUseFeatures.mockReturnValue({});
    });

    it.each([
      ["duplicate", /This Organisation has already been invited/],
      ["email_in_use", /already the lead applicant for another Organisation/],
    ])("shows why a %s conflict failed", async (reason, text) => {
      global.fetch.mockImplementation((url: string) => {
        if (url.endsWith("/organisations/unclaimed")) {
          return mockFailedJson(reason, 409);
        }

        return mock200Json(null);
      });

      await renderSubmitted();

      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(
        screen.queryByText(/There was an error inviting the Organisation/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("when asking the superadmin to contact the Organisation", () => {
    it.each([
      ["claimed_duplicate", /is already registered/],
      ["unclaimed_duplicate", /has already been invited and has not yet/],
      [
        "claimed_duplicate_without_email",
        /with this name is already registered/,
      ],
      [
        "unclaimed_duplicate_without_email",
        /with this name has already been invited/,
      ],
    ])("shows why a %s conflict failed", async (reason, text) => {
      global.fetch.mockImplementation((url: string) => {
        if (
          url.endsWith("/organisations/unclaimed_before_superadmin_invitation")
        ) {
          return mockFailedJson(reason, 409);
        }

        return mock200Json(null);
      });

      await renderSubmitted();

      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(
        screen.queryByText(/There was an error inviting the Organisation/i)
      ).not.toBeInTheDocument();
    });
  });

  it("shows why an existing organisation's email change conflicted", async () => {
    global.fetch.mockImplementation((url: string) => {
      if (url.endsWith(`/organisations/${organisation.id}`)) {
        return mockFailedJson("email_in_use", 409);
      }

      return mock200Json(null);
    });

    renderSendInviteOrganisation({ organisation });

    fireEvent.change(screen.getByRole("textbox", { name: /Email/i }), {
      target: { value: "lead@example.com" },
    });

    await act(() => {
      fireEvent.submit(screen.getByRole("button", { name: /invite/i }));
    });

    expect(
      await screen.findByText(
        /already the lead applicant for another Organisation/
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/You have successfully invited the Organisation/i)
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderSendInviteOrganisation());
  });
});
