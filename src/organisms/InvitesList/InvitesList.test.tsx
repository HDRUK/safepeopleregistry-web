import { mockedPendingInvite } from "@/mocks/data/user";
import { mock200Json, mockPagedResults } from "jest.utils";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import InvitesList from "./InvitesList";

const getPendingInvitesUrls = () =>
  global.fetch.mock.calls
    .map(([url]: [string]) => decodeURIComponent(url))
    .filter((url: string) => url.includes("/pending_invites"));

const setupTest = () => {
  global.fetch.mockImplementation((url: string) => {
    if (url.includes("/pending_invites")) {
      return mock200Json(mockPagedResults([mockedPendingInvite()]));
    }

    return mock200Json(null);
  });

  return render(<InvitesList />);
};

const openSortMenu = () =>
  fireEvent.mouseDown(screen.getByRole("combobox", { name: /Sort/ }));

const selectSort = (name: string) => {
  openSortMenu();
  fireEvent.click(screen.getByRole("option", { name }));
};

describe("<InvitesList />", () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  it("requests invites sorted by date sent, newest first, by default", async () => {
    setupTest();

    await waitFor(() => {
      expect(getPendingInvitesUrls()[0]).toContain("sort=invite_sent_at:desc");
    });
  });

  it("offers to sort by name and date sent", async () => {
    setupTest();

    openSortMenu();

    expect(
      await screen.findByRole("option", { name: "Name (A-Z)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Date invite sent (Oldest first)" })
    ).toBeInTheDocument();
  });

  it.each([
    ["Name (A-Z)", "sort=users.name:asc", "Name (Z-A)", "sort=users.name:desc"],
    [
      "Date invite sent (Oldest first)",
      "sort=invite_sent_at:asc",
      "Date invite sent (Newest first)",
      "sort=invite_sent_at:desc",
    ],
  ])(
    "requests %p then flips to %p",
    async (firstOption, firstSort, flippedOption, flippedSort) => {
      setupTest();

      selectSort(firstOption);

      await waitFor(() => {
        expect(getPendingInvitesUrls().at(-1)).toContain(firstSort);
      });

      selectSort(flippedOption);

      await waitFor(() => {
        expect(getPendingInvitesUrls().at(-1)).toContain(flippedSort);
      });
    }
  );

  it("sorts by date sent, newest first, when switching back from name", async () => {
    setupTest();

    selectSort("Name (A-Z)");

    await waitFor(() => {
      expect(getPendingInvitesUrls().at(-1)).toContain("sort=users.name:asc");
    });

    selectSort("Date invite sent (Newest first)");

    await waitFor(() => {
      expect(getPendingInvitesUrls().at(-1)).toContain(
        "sort=invite_sent_at:desc"
      );
    });
  });
});
