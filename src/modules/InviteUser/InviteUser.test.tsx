import postOrganisationInviteUser from "@/app/actions/organisations/postOrganisationInviteUser";
import postOrganisationUnclaimed from "@/app/actions/organisations/postOrganisationUnclaimed";
import { EntityType } from "@/types/api";
import { faker } from "@faker-js/faker";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import InviteUser from "./InviteUser";

jest.mock("@/data/store");

jest.mock("@/components/FeatureProvider", () => ({
  useFeatures: () => ({ isSroRequirementEnabled: true }),
}));

jest.mock("@/app/actions/organisations/postOrganisationUnclaimed", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/app/actions/organisations/postOrganisationInviteUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedPostOrganisationUnclaimed = jest.mocked(postOrganisationUnclaimed);
const mockedPostOrganisationInviteUser = jest.mocked(
  postOrganisationInviteUser
);

const mockSubmit = jest.fn();

const fields = ["First name", "Last name", "Email"];

const renderInviteUserComponent = () => {
  return render(
    <InviteUser
      organisationId={1}
      onSuccess={mockSubmit}
      enableEmailCheck={false}
    />
  );
};

describe("<InviteUser />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedPostOrganisationInviteUser.mockResolvedValue({
      ok: true,
      status: 201,
      message: "success",
      data: 1,
    } as never);
  });

  it.each(fields)("does not submit when %s is not defined", async fieldName => {
    renderInviteUserComponent();

    const input = screen.getByRole("textbox", { name: fieldName });

    if (input) {
      fireEvent.change(input, { target: { value: faker.string.sample() } });

      const button = screen.getByRole("button", { name: /invite/i });

      await act(() => {
        fireEvent.submit(button);
      });

      expect(button).not.toBeDisabled();

      await waitFor(() => {
        expect(mockSubmit).not.toHaveBeenCalled();
      });
    } else {
      throw new Error(`Could not find input ${fieldName}`);
    }
  });

  it("submits with the correct fields", async () => {
    renderInviteUserComponent();

    fields.forEach(name => {
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

    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it("has no accessibility violations", async () => {
    await commonAccessibilityTests(renderInviteUserComponent());
  });

  it("shows unapproved organisations to a Custodian as pending approval", async () => {
    render(
      <InviteUser
        onSuccess={mockSubmit}
        enableEmailCheck={false}
        entityId={1}
        entityType={EntityType.CUSTODIAN}
      />
    );

    fireEvent.mouseDown(
      await screen.findByRole("combobox", { name: /organisation/i })
    );

    expect(
      await screen.findByRole("option", { name: /Organisation 1/ })
    ).toHaveTextContent("Pending approval by HDR UK");
  });

  describe("when inviting to an Organisation that is not listed", () => {
    const submitWithNewOrganisation = async () => {
      render(
        <InviteUser
          onSuccess={mockSubmit}
          enableEmailCheck={false}
          entityId={1}
          entityType={EntityType.USER}
        />
      );

      fireEvent.click(screen.getByRole("button", { name: /type it instead/i }));

      [
        ["First name", "Jane"],
        ["Last name", "Doe"],
        ["Email", "user@example.com"],
        ["Organisation name", "Example Organisation"],
        ["Email address", "lead@example.com"],
      ].forEach(([name, value]) => {
        fireEvent.change(screen.getByRole("textbox", { name }), {
          target: { value },
        });
      });

      await act(() => {
        fireEvent.submit(screen.getByRole("button", { name: /invite/i }));
      });
    };

    it.each([
      ["duplicate", /This Organisation has already been invited/],
      ["email_in_use", /already the lead applicant for another Organisation/],
    ])(
      "shows why a %s conflict failed and does not invite the user",
      async (reason, text) => {
        mockedPostOrganisationUnclaimed.mockResolvedValue({
          ok: false,
          status: 409,
          message: "conflict",
          data: reason,
        } as never);

        await submitWithNewOrganisation();

        expect(await screen.findByText(text)).toBeInTheDocument();
        expect(mockedPostOrganisationInviteUser).not.toHaveBeenCalled();
        expect(mockSubmit).not.toHaveBeenCalled();
      }
    );
  });
});
