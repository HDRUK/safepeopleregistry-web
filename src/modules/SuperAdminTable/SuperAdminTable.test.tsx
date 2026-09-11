import { Status } from "@/consts/application";
import { UserGroup } from "@/consts/user";
import { mockedUser } from "@/mocks/data/user";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { formatDisplayLongDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import SuperAdminTable, { SuperAdminTableProps } from "./SuperAdminTable";

const admin = mockedUser({
  user_group: UserGroup.ADMINS,
  status: Status.INVITED,
});

const TestComponent = (props?: Partial<SuperAdminTableProps>) => {
  const t = useTranslations("Admin.SuperAdminList");

  return (
    <SuperAdminTable
      t={t}
      data={[]}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<SuperAdminTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<SuperAdminTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(screen.getByText(/No admins found/i)).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [admin],
    });

    expect(
      screen.getByText(`${admin.first_name} ${admin.last_name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(admin.email)).toBeInTheDocument();
    expect(screen.getByText("Invited")).toBeInTheDocument();
    expect(
      screen.getByText(formatDisplayLongDate(admin.created_at))
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
