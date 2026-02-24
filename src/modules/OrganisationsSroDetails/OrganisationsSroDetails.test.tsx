import { mockedOrganisation } from "@/mocks/data/organisation";
import { commonAccessibilityTests, render, screen } from "@/utils/testUtils";
import OrganisationsSroDetails, {
  OrganisationsSroDetailsProps,
} from "./OrganisationsSroDetails";

const organisation = mockedOrganisation();

const TestComponent = (props?: Partial<OrganisationsSroDetailsProps>) => {
  return <OrganisationsSroDetails organisation={organisation} {...props} />;
};

const setupTest = (props?: Partial<OrganisationsSroDetailsProps>) => {
  return render(<TestComponent {...props} />);
};

describe("<OrganisationsSubsidiariesTable />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(screen.getByText(organisation.sro_profile_uri)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${organisation.sro_officer?.first_name} ${organisation.sro_officer?.last_name}`
      )
    ).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    commonAccessibilityTests(setupTest());
  });
});
