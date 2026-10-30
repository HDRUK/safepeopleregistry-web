import { mockedOrganisation } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import OrganisationsTable, {
  OrganisationsTableProps,
} from "./OrganisationsTable";
import { OrganisationSroStatus, Status } from "@/consts/application";

const organisation = mockedOrganisation();

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
    ["Account created", { unclaimed: false }],
    [
      "Invited by admin",
      {
        unclaimed: true,
        model_state: { state: { slug: Status.ORGANISATION_INVITED_BY_ADMIN } },
      },
    ],
    [
      "Invited by non-admin",
      {
        unclaimed: true,
        model_state: {
          state: { slug: Status.ORGANISATION_INVITED_BY_NONADMIN },
        },
      },
    ],
    ["Placeholder", { unclaimed: true }],
  ])("renders the %s status", (label, overrides) => {
    setupTest({
      includeColumns: ["status"],
      data: [mockedOrganisation(overrides)],
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([
    ["SRO claimed", OrganisationSroStatus.CLAIMED],
    ["SRO invited (delegates acting)", OrganisationSroStatus.INVITED],
    ["No SRO (delegates acting)", OrganisationSroStatus.NONE],
  ])("renders the %s SRO status", (label, sroStatus) => {
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
