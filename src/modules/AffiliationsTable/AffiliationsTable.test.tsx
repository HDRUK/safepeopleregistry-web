import { Status } from "@/components/ChipStatus";
import { mockedAffiliation } from "@/mocks/data/user";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import { useTranslations } from "next-intl";
import AffiliationsTable, { AffiliationsTableProps } from "./AffiliationsTable";

const affiliation = mockedAffiliation({
  relationship: "employee",
  model_state: {
    state: {
      slug: Status.AFFILIATION_APPROVED,
    },
  },
});

const TestComponent = (props?: Partial<AffiliationsTableProps>) => {
  const t = useTranslations("Affiliations");

  return (
    <AffiliationsTable
      t={t}
      data={[]}
      {...props}
      total={props?.data?.length || 0}
    />
  );
};

const setupTest = (props?: Partial<AffiliationsTableProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<AffiliationsTable />", () => {
  it("renders warning message if no data", () => {
    setupTest();

    expect(
      screen.getByText(/You currently have no affiliations/i)
    ).toBeInTheDocument();
  });

  it("renders the correct values data", () => {
    setupTest({
      data: [affiliation],
    });

    expect(
      screen.getByText(affiliation.organisation.organisation_name)
    ).toBeInTheDocument();
    expect(screen.getByText("Affiliated")).toBeInTheDocument();
    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText(affiliation.member_id)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
