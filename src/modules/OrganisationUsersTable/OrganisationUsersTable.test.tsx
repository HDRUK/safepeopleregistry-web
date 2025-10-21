import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/consts/router";
import { mockedUser } from "@/mocks/data/user";
import { formatShortDate } from "@/utils/date";
import OrganisationUsersTable, {
  OrganisationUsersTableProps,
} from "./OrganisationUsersTable";
import { getName } from "@/utils/application";

const user = mockedUser();

const mockOnRemove = jest.fn();

const TestComponent = (props?: Partial<OrganisationUsersTableProps>) => {
  const t = useTranslations("Projects.OrganisationUsers");

  return (
    <OrganisationUsersTable
      t={t}
      data={[]}
      onRemove={mockOnRemove}
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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
