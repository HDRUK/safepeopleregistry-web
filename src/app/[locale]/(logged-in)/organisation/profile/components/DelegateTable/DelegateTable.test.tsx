import deleteOrganisationDelegate from "@/app/actions/organisations/deleteOrganisationDelegate";
import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { UsersResponse } from "@/services/users";
import { ResponseJson } from "@/types/requests";
import { fireEvent, render, screen, waitFor, within } from "@/utils/testUtils";
import { UseQueryResult } from "@tanstack/react-query";
import DelegateTable from "./DelegateTable";

jest.mock("@/app/actions/organisations/deleteOrganisationDelegate", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const ORGANISATION_ID = 1;

const organisationUser = (id: number, is_sro: boolean) =>
  mockedUser({
    id,
    user_group: UserGroup.ORGANISATIONS,
    organisation_id: ORGANISATION_ID,
    is_sro,
    is_delegate: is_sro ? 0 : 1,
    first_name: `First${id}`,
    last_name: `Last${id}`,
  });

const sro = organisationUser(1, true);
const delegateA = organisationUser(10, false);
const delegateB = organisationUser(11, false);

const renderTable = ({
  me,
  hasClaimedSro,
}: {
  me: typeof sro;
  hasClaimedSro: boolean;
}) => {
  const refetch = jest.fn();

  mockUseStore({
    getUser: () => me,
    config: {
      organisation: mockedOrganisation({
        id: ORGANISATION_ID,
        has_claimed_sro: hasClaimedSro,
      }),
    },
  });

  render(
    <DelegateTable
      {...({
        refetch,
        data: { data: [delegateA, delegateB] },
        isLoading: false,
        isError: false,
      } as unknown as UseQueryResult<ResponseJson<UsersResponse>, Error>)}
    />
  );

  return { refetch };
};

const rowFor = (user: typeof sro) =>
  screen.getByText(`${user.first_name} ${user.last_name}`).closest("tr")!;

const openActions = (user: typeof sro) =>
  fireEvent.click(within(rowFor(user)).getByLabelText("Actions"));

const canRemove = (user: typeof sro) => {
  openActions(user);
  const removable = screen.queryByRole("menuitem", { name: /Remove/ }) !== null;
  fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

  return removable;
};

describe("<DelegateTable />", () => {
  beforeEach(() => {
    (deleteOrganisationDelegate as jest.Mock).mockResolvedValue({
      status: 200,
      data: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("lets the SRO remove any delegate", () => {
    renderTable({ me: sro, hasClaimedSro: true });

    expect(canRemove(delegateA)).toBe(true);
    expect(canRemove(delegateB)).toBe(true);
  });

  it("lets a delegate remove other delegates before the organisation has an SRO, but not themselves", () => {
    renderTable({ me: delegateA, hasClaimedSro: false });

    expect(canRemove(delegateA)).toBe(false);
    expect(canRemove(delegateB)).toBe(true);
  });

  it("lets a delegate remove other delegates once the organisation has an SRO, but not themselves", () => {
    renderTable({ me: delegateA, hasClaimedSro: true });

    expect(canRemove(delegateA)).toBe(false);
    expect(canRemove(delegateB)).toBe(true);
  });

  it("removes the delegate via the organisation delegates endpoint once confirmed", async () => {
    const { refetch } = renderTable({ me: sro, hasClaimedSro: true });

    openActions(delegateB);
    fireEvent.click(screen.getByRole("menuitem", { name: /Remove/ }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Remove",
      })
    );

    await waitFor(() => {
      expect(deleteOrganisationDelegate).toHaveBeenCalledWith(
        ORGANISATION_ID,
        delegateB.id,
        expect.anything()
      );
      expect(refetch).toHaveBeenCalled();
    });
  });
});
