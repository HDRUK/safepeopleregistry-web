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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderSendInviteOrganisation());
  });
});
