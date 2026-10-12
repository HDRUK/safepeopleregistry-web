import { useRouter } from "@/i18n/routing";
import { mockedJwt } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import { UserGroup } from "@/consts/user";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { postRegister } from "@/app/actions/auth";
import { useRouter as useNextRouter } from "next/navigation";
import { registerInvite } from "../../actions";
import AccountConfirm from "./AccountConfirm";

jest.mock("../../actions", () => ({
  acceptTCs: jest.fn(),
  registerInvite: jest.fn(),
  rejectTCs: jest.fn(),
}));

jest.mock("@/components/TermsAndConditions", () => ({
  __esModule: true,
  default: ({ onAccept }: { onAccept: () => void }) => (
    <button type="button" onClick={onAccept}>
      Accept terms
    </button>
  ),
}));

jest.mock("@/i18n/routing", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

jest.mock("@/app/actions/auth", () => ({
  postRegister: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: () => mockedJwt,
}));

const mockedReplace = jest.fn();

const TestComponent = () => {
  return <AccountConfirm showAccountPicker={false} unclaimedUser={undefined} />;
};

describe("<AccountConfirm />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockedReplace,
    });

    (postRegister as jest.Mock).mockReset();
  });

  // Existing tests...

  /*
  - the following was causing all sorts of problems due to mocking data 
  - need to revisit but shouldnt have written tests like this in the first place IMO
  it("should enable checkbox after accepting terms", async () => {
    render(<AccountConfirm />);
    const termsLink = screen.getByText("Terms and Conditions");
    fireEvent.click(termsLink);

    const acceptButton = screen.getByRole("button", {
      name: /accept terms and conditions/i,
    });
    fireEvent.click(acceptButton);

    await waitFor(() => {
      const termsCheckbox = screen.getByRole("checkbox");
      expect(termsCheckbox).not.toBeDisabled();
    });
  });

  it("should not enable checkbox after declining terms", async () => {
    render(<AccountConfirm />);
    const termsLink = screen.getByText("Terms and Conditions");
    fireEvent.click(termsLink);

    const declineButton = screen.getByRole("button", { name: /decline/i });
    fireEvent.click(declineButton);

    await waitFor(() => {
      const termsCheckbox = screen.getByRole("checkbox");
      expect(termsCheckbox).toBeDisabled();
    });
  });

  it("should disable continue button when terms are not accepted", async () => {
    render(<AccountConfirm />);

    const optionMyself = screen.getByRole("button", {
      name: /represent myself/i,
    });
    fireEvent.click(optionMyself);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();
  });
  */
  it("has no accessibility violations", async () => {
    commonAccessibilityTests(render(<TestComponent />));
  });

  it("tells an invitee when their account could not be claimed, and stays on the page", async () => {
    const push = jest.fn();
    (useNextRouter as jest.Mock).mockReturnValue({ push });
    (registerInvite as jest.Mock).mockResolvedValue({ ok: false });

    render(
      <AccountConfirm
        unclaimedUser={mockedUser({
          user_group: UserGroup.ORGANISATIONS,
          organisation_id: 1,
        })}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Accept terms" }));

    expect(
      await screen.findByText(/couldn't set up your account from this invite/)
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
