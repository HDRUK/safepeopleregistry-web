import { useRouter as useI18nRouter } from "@/i18n/routing";
import { UserGroup } from "@/consts/user";
import { mockedJwt } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { postRegister } from "@/app/actions/auth";
import { registerInvite } from "@/app/[locale]/(user-only)/register/actions";
import { useRouter } from "next/navigation";
import AccountConfirm from "@/app/[locale]/(user-only)/register/components/AccountConfirm/AccountConfirm";

jest.mock("@/i18n/routing", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

jest.mock("@/app/actions/auth", () => ({
  postRegister: jest.fn(),
}));

jest.mock("@/app/[locale]/(user-only)/register/actions", () => ({
  acceptTCs: jest.fn(),
  rejectTCs: jest.fn(),
  registerInvite: jest.fn(),
}));

jest.mock("@/components/TermsAndConditions", () => ({
  __esModule: true,
  default: ({ onAccept }: { onAccept: () => void }) => (
    <button type="button" onClick={onAccept}>
      Accept terms
    </button>
  ),
}));

const mockInvalidateQueries = jest.fn();

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: () => ({ invalidateQueries: mockInvalidateQueries }),
}));

jest.mock("js-cookie", () => ({
  get: () => mockedJwt,
}));

const mockedReplace = jest.fn();
const mockedPush = jest.fn();

const TestComponent = () => {
  return <AccountConfirm showAccountPicker={false} unclaimedUser={undefined} />;
};

const registerAsInvitedResearcher = () => {
  render(
    <AccountConfirm
      unclaimedUser={mockedUser({ user_group: UserGroup.USERS })}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("button", { name: "Accept terms" }));
};

describe("<AccountConfirm />", () => {
  beforeEach(() => {
    (useI18nRouter as jest.Mock).mockReturnValue({
      replace: mockedReplace,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockedPush });

    (postRegister as jest.Mock).mockReset();
    (registerInvite as jest.Mock).mockResolvedValue({ ok: true });
    mockInvalidateQueries.mockReset();
    mockedPush.mockReset();
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
    await commonAccessibilityTests(render(<TestComponent />));
  });

  it("reloads the signed-in user before leaving once an invitee has registered", async () => {
    registerAsInvitedResearcher();

    await waitFor(() => expect(mockedPush).toHaveBeenCalled());

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["getMe"],
    });
    expect(mockInvalidateQueries.mock.invocationCallOrder[0]).toBeLessThan(
      mockedPush.mock.invocationCallOrder[0]
    );
  });

  it("stays on the page without reloading the user when registering an invitee fails", async () => {
    (registerInvite as jest.Mock).mockResolvedValue({ ok: false });

    registerAsInvitedResearcher();

    await waitFor(() => expect(registerInvite).toHaveBeenCalled());

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
    expect(mockedPush).not.toHaveBeenCalled();
  });
});
