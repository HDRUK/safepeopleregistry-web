import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { Status } from "@/consts/application";
import { mockedRegistrationAffiliation } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { useMutation } from "@tanstack/react-query";
import CheckYourEmail from "@/app/[locale]/(user-only)/add-affiliation/components/CheckYourEmail/CheckYourEmail";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const mockResend = jest.fn();

const affiliation = mockedRegistrationAffiliation({
  id: 7,
  state: Status.AFFILIATION_EMAIL_VERIFY,
  email: "researcher@university.example.com",
});

const renderCheckYourEmail = () =>
  render(<CheckYourEmail affiliation={affiliation} />);

describe("<CheckYourEmail />", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({ mutateAsync: mockResend });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("tells the researcher where the verification link was sent", () => {
    renderCheckYourEmail();

    expect(
      screen.getByRole("heading", { name: "Verification needed" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/researcher@university\.example\.com/)
    ).toBeInTheDocument();
  });

  it("resends the verification email for the affiliation", () => {
    renderCheckYourEmail();

    fireEvent.click(
      screen.getByRole("button", { name: "Resend verification email" })
    );

    expect(mockResend).toHaveBeenCalledWith(7);
  });

  it("points the researcher to the enquiries inbox for help", () => {
    renderCheckYourEmail();

    expect(
      screen.getByRole("link", { name: CONTACT_MAIL_ADDRESS })
    ).toHaveAttribute("href", `mailto:${CONTACT_MAIL_ADDRESS}`);
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(renderCheckYourEmail());
  });
});
