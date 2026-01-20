import { mockedPendingInvite } from "@/mocks/data/user";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import InvitesTable, { InvitesTableProps } from "./InvitesTable";

const pendingInvite = mockedPendingInvite();

const TestComponent = (props?: Partial<InvitesTableProps>) => {
  const t = useTranslations("Admin.InvitesFilters");

  return (
    <InvitesTable t={t} data={[]} {...props} total={props?.data?.length || 0} />
  );
};

const setupTest = (props?: Partial<InvitesTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<InvitesTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(
      screen.getByText(/There are no pending invites for these search filters/i)
    ).toBeInTheDocument();
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
