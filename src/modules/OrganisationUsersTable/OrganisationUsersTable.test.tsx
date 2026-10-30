import {
  commonAccessibilityTests,
  fireEvent,
  render,
  screen,
} from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/consts/router";
import { Status } from "@/consts/application";
import { mockedAffiliation, mockedUser } from "@/mocks/data/user";
import { formatShortDate } from "@/utils/date";
import { getName } from "@/utils/application";
import OrganisationUsersTable, {
  OrganisationUsersTableProps,
} from "./OrganisationUsersTable";

const user = mockedUser();

const mockOnRecordLeaver = jest.fn();

const TestComponent = (props?: Partial<OrganisationUsersTableProps>) => {
  const t = useTranslations("ProfileOrganisation");

  return (
    <OrganisationUsersTable
      t={t}
      data={[]}
      onRecordLeaver={mockOnRecordLeaver}
      routes={{
        name: ROUTES.profileOrganisationUsersIdentity,
      }}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<OrganisationUsersTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<OrganisationUsersTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [user],
    });

    expect(screen.getByText(new RegExp(getName(user)))).toBeInTheDocument();
    expect(
      screen.getByText(user?.registry?.affiliations?.[0].email as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatShortDate(user.created_at))
    ).toBeInTheDocument();
    expect(screen.getByText(/Affiliated/)).toBeInTheDocument();
  });

  it("shows the affiliation's end date", () => {
    const affiliation = mockedAffiliation({ to: "2030-06-30" });

    setupTest({
      data: [
        mockedUser({
          registry: { ...user.registry, affiliations: [affiliation] },
        }),
      ],
    });

    expect(
      screen.getByText(formatShortDate("2030-06-30") as string)
    ).toBeInTheDocument();
  });

  it("records a leaver for a current affiliation", () => {
    setupTest({
      data: [user],
    });

    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.click(screen.getByText("Record leaver"));

    expect(mockOnRecordLeaver).toHaveBeenCalledWith(
      user,
      user.registry.affiliations?.[0]
    );
  });

  it("cannot record a leaver for an affiliation that has ended", () => {
    const affiliation = mockedAffiliation({
      model_state: { state: { slug: Status.AFFILIATION_LEFT } },
    });

    setupTest({
      data: [
        mockedUser({
          registry: { ...user.registry, affiliations: [affiliation] },
        }),
      ],
    });

    expect(
      screen.queryByRole("button", { name: "Actions" })
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
