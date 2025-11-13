import { mockedPendingInvite } from "@/mocks/data/user";
import { getName } from "@/utils/application";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import UsersTable, { UsersTableProps } from "./UsersTable";

const pendingInvite = mockedPendingInvite();

const TestComponent = (props?: Partial<UsersTableProps>) => {
  const t = useTranslations("UsersList");

  return (
    <UsersTable t={t} data={[]} {...props} total={props?.data?.length || 0} />
  );
};

const setupTest = (props?: Partial<UsersTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<UsersTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [pendingInvite],
    });

    expect(screen.getByText(pendingInvite.user.name)).toBeInTheDocument();
    expect(screen.getByText("Invited")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
