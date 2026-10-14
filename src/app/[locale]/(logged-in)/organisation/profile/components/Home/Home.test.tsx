import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "@/utils/testUtils";
import Home from "./Home";

jest.mock("@/mocks/data/cms", () => ({
  mockedOrganisationHomeIntro: "SRO intro",
  mockedOrganisationDelegateHomeIntro: "Delegate intro",
}));

jest.mock("@/organisms/ActionLogs", () => ({
  __esModule: true,
  default: ({ panelProps }: { panelProps: { description: string } }) => (
    <div>{panelProps.description}</div>
  ),
}));

describe("<Home />", () => {
  it.each([
    { label: "sro only", is_sro: true, is_delegate: 0, intro: "SRO intro" },
    {
      label: "sro and delegate",
      is_sro: true,
      is_delegate: 1,
      intro: "SRO intro",
    },
    {
      label: "delegate only",
      is_sro: false,
      is_delegate: 1,
      intro: "Delegate intro",
    },
    {
      label: "neither flag",
      is_sro: false,
      is_delegate: 0,
      intro: "Delegate intro",
    },
  ])(
    "shows the $intro for a user with $label",
    ({ is_sro, is_delegate, intro }) => {
      mockUseStore({
        getUser: () =>
          mockedUser({
            user_group: UserGroup.ORGANISATIONS,
            organisation_id: 1,
            is_sro,
            is_delegate,
          }),
      });

      render(<Home />);

      expect(screen.getByText(intro)).toBeInTheDocument();
    }
  );
});
