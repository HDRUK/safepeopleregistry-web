import { mockedCharity, mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import OrganisationsDigitalIdentifiersDetails, {
  OrganisationsDigitalIdentifiersDetailsProps,
} from "./OrganisationsDigitalIdentifiersDetails";

const organisation = mockedOrganisation({
  charities: [mockedCharity()],
});

const defaultProps = {
  organisationData: organisation,
};

const setupTest = (props?: OrganisationsDigitalIdentifiersDetailsProps) => {
  return render(
    <OrganisationsDigitalIdentifiersDetails {...defaultProps} {...props} />
  );
};

describe("<OrganisationsDigitalIdentifiersDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(
      screen.getByText(organisation.companies_house_no)
    ).toBeInTheDocument();
    expect(screen.getByText(organisation.ror_id)).toBeInTheDocument();
    expect(
      screen.getByText(organisation.companies_house_no)
    ).toBeInTheDocument();
  });

  it("renders the correct subsidiaries", () => {
    setupTest();

    expect(
      screen.getByText(organisation.charities[0].registration_id)
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.charities[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.charities[0].website)
    ).toBeInTheDocument();
  });
});
