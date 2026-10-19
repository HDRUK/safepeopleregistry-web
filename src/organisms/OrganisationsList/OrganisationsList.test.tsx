import { Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { Organisation } from "@/types/application";
import { mock200Json, mockPagedResults } from "jest.utils";
import {
  act,
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from "../../utils/testUtils";
import OrganisationsList from "./OrganisationsList";

const getOrganisationsUrls = () =>
  global.fetch.mock.calls
    .map(([url]: [string]) => decodeURIComponent(url))
    .filter((url: string) => url.includes("/organisations"));

const getFilterMenu = (name: RegExp) => screen.getByRole("combobox", { name });

const selectFilter = (menu: RegExp, option: string) => {
  fireEvent.mouseDown(getFilterMenu(menu));
  fireEvent.click(screen.getByRole("option", { name: option }));
};

const clearFilter = (menu: RegExp) => {
  const field = getFilterMenu(menu).closest(".MuiInputBase-root") as HTMLElement;

  fireEvent.click(within(field).getByRole("button", { name: "clear selection" }));
};

const mockedInvitedOrganisation = (userGroup: UserGroup) =>
  mockedOrganisation({
    unclaimed: true,
    model_state: {
      state: {
        slug:
          userGroup === UserGroup.ADMINS
            ? Status.ORGANISATION_INVITED_BY_ADMIN
            : Status.ORGANISATION_INVITED_BY_NONADMIN,
      },
    },
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
  it("shows the invite action for an organisation invited by non-admin", async () => {
    const organisation = mockedInvitedOrganisation(UserGroup.CUSTODIANS);

    setupTest(organisation);

    await openActionMenu(organisation);

    expect(
      screen.getByRole("menuitem", { name: "Invite" })
    ).toBeInTheDocument();
  });

  it("does not show the invite action for an organisation invited by Admin", async () => {
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
      unclaimed: true,
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

  describe("filters", () => {
    beforeEach(() => {
      global.fetch.mockClear();
    });

    it("searches by organisation name", async () => {
      setupTest(mockedOrganisation());

      await act(async () => {
        await userEvent.type(screen.getByRole("textbox"), "hdruk{enter}");
      });

      await waitFor(() => {
        expect(getOrganisationsUrls().at(-1)).toContain(
          "organisation_name[]=hdruk"
        );
      });
    });

    it.each([
      [/Filter by account status/, "Account created", "account_status=organisation_account_created"],
      [/Filter by account status/, "Invited by admin", "account_status=organisation_invited_by_admin"],
      [/Filter by account status/, "Invited by non-admin", "account_status=organisation_invited_by_nonadmin"],
      [/Filter by account status/, "Placeholder", "account_status=organisation_placeholder"],
      [/Filter by SRO status/, "SRO claimed", "sro_status=claimed"],
      [/Filter by SRO status/, "SRO invited (delegates acting)", "sro_status=invited"],
      [/Filter by SRO status/, "No SRO (delegates acting)", "sro_status=none"],
      [/Filter by approval/, "Approved", "system_approved=1"],
      [/Filter by approval/, "Not approved", "system_approved=0"],
    ])(
      "%p %p requests %p",
      async (menu, option, expectedParam) => {
        setupTest(mockedOrganisation());

        selectFilter(menu, option);

        await waitFor(() => {
          expect(getOrganisationsUrls().at(-1)).toContain(expectedParam);
        });
      }
    );

    it("stops filtering once a filter is cleared", async () => {
      setupTest(mockedOrganisation());

      selectFilter(/Filter by SRO status/, "SRO claimed");

      await waitFor(() => {
        expect(getOrganisationsUrls().at(-1)).toContain("sro_status=claimed");
      });

      clearFilter(/Filter by SRO status/);

      await waitFor(() => {
        expect(getOrganisationsUrls().at(-1)).not.toContain("sro_status");
      });
    });

    it("combines filters", async () => {
      setupTest(mockedOrganisation());

      selectFilter(/Filter by approval/, "Approved");
      selectFilter(/Filter by account status/, "Placeholder");

      await waitFor(() => {
        const url = getOrganisationsUrls().at(-1);

        expect(url).toContain("system_approved=1");
        expect(url).toContain("account_status=organisation_placeholder");
      });
    });
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(
      setupTest(mockedInvitedOrganisation(UserGroup.CUSTODIANS))
    );
  });
});
