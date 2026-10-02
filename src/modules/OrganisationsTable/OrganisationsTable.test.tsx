import { UserGroup } from "@/consts/user";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import OrganisationsTable, {
  OrganisationsTableProps,
} from "./OrganisationsTable";

const organisation = mockedOrganisation();

const sroInvitedBy = (userGroup: UserGroup) =>
  mockedUser({ invited_by: mockedUser({ user_group: userGroup }) });

const TestComponent = (props?: Partial<OrganisationsTableProps>) => {
  const t = useTranslations("OrganisationsList");

  return (
    <OrganisationsTable
      t={t}
      data={[]}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<OrganisationsTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<OrganisationsTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(screen.getByText(/No organisations found/i)).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [organisation],
    });

    expect(
      screen.getByText(organisation.organisation_name)
    ).toBeInTheDocument();
    expect(screen.getByText("Not approved")).toBeInTheDocument();
  });

  it.each([
    ["Account created", { unclaimed: 0 }],
    [
      "Invited by HDR UK",
      { unclaimed: 1, sro_officer: sroInvitedBy(UserGroup.ADMINS) },
    ],
    [
      "Invited by other",
      { unclaimed: 1, sro_officer: sroInvitedBy(UserGroup.CUSTODIANS) },
    ],
    ["Placeholder", { unclaimed: 1 }],
  ])("renders the %s status", (label, overrides) => {
    setupTest({
      includeColumns: ["status"],
      data: [mockedOrganisation(overrides)],
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([
    ["Approved", "approved"],
    ["Pending", "pending"],
    ["Rejected", "rejected"],
  ] as const)("renders the %s SRO status", (label, sroStatus) => {
    setupTest({
      includeColumns: ["sroStatus"],
      data: [mockedOrganisation({ sro_status: sroStatus })],
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
