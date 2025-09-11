import { mockedOrganisation } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import OrganisationsTable, {
  OrganisationsTableProps,
} from "./OrganisationsTable";

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

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
