import { Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { Organisation } from "@/types/application";
import { mock200Json, mockPagedResults } from "jest.utils";
import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../utils/testUtils";
import OrganisationsList from "./OrganisationsList";

const mockedInvitedOrganisation = (userGroup: UserGroup) =>
  mockedOrganisation({
    unclaimed: 1,
    model_state: { state: { slug: Status.INVITED } },
    sro_officer: mockedUser({
      invited_by: mockedUser({ user_group: userGroup }),
    }),
  });

const setupTest = (organisation: Organisation) => {
  global.fetch.mockImplementation((url: string) => {
    if (url.includes("/organisations")) {
      return mock200Json(mockPagedResults([organisation]));
    }

    return mock200Json(null);
  });

  return render(<OrganisationsList />);
};

const openActionMenu = async (organisation: Organisation) => {
  await waitFor(() => {
    expect(
      screen.getByText(organisation.organisation_name)
    ).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: "Actions" }));
};

describe("<OrganisationsList />", () => {
  it("shows the invite action for an organisation invited by other", async () => {
    const organisation = mockedInvitedOrganisation(UserGroup.CUSTODIANS);

    setupTest(organisation);

    await openActionMenu(organisation);

    expect(
      screen.getByRole("menuitem", { name: "Invite" })
    ).toBeInTheDocument();
  });

  it("does not show the invite action for an organisation invited by HDR UK", async () => {
    const organisation = mockedInvitedOrganisation(UserGroup.ADMINS);

    setupTest(organisation);

    await openActionMenu(organisation);

    expect(
      screen.queryByRole("menuitem", { name: "Invite" })
    ).not.toBeInTheDocument();
  });

  it("shows the invite action for a suggested organisation", async () => {
    const organisation = mockedOrganisation({
      lead_applicant_email: "",
      unclaimed: 1,
      model_state: undefined,
    });

    setupTest(organisation);

    await openActionMenu(organisation);

    expect(
      screen.getByRole("menuitem", { name: "Invite" })
    ).toBeInTheDocument();
  });

  it("opens the invite modal prefilled with the organisation details", async () => {
    const organisation = mockedInvitedOrganisation(UserGroup.CUSTODIANS);

    setupTest(organisation);

    await openActionMenu(organisation);

    fireEvent.click(screen.getByRole("menuitem", { name: "Invite" }));

    await waitFor(() => {
      expect(screen.getByTestId("form-modal")).toBeInTheDocument();
    });

    expect(screen.getByRole("textbox", { name: /Name/i })).toHaveValue(
      organisation.organisation_name
    );
    expect(screen.getByRole("textbox", { name: /Email/i })).toHaveValue(
      organisation.lead_applicant_email
    );
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      setupTest(mockedInvitedOrganisation(UserGroup.CUSTODIANS))
    );
  });
});
