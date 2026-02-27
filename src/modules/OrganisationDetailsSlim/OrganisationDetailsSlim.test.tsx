import { mockedOrganisation } from "@/mocks/data/organisation";
import { render, screen } from "@/utils/testUtils";
import OrganisationDetailsSlim, {
  OrganisationDetailsSlimProps,
} from "./OrganisationDetailsSlim";

const organisation = mockedOrganisation();

const defaultProps = {
  organisation,
};

const setupTest = (props?: OrganisationDetailsSlimProps) => {
  return render(<OrganisationDetailsSlim {...defaultProps} {...props} />);
};

describe("<OrganisationsDigitalIdentifiersDetails />", () => {
  it("renders all main fields with correct values", () => {
    setupTest();

    expect(
      screen.getByText(new RegExp(`CRN: ${organisation.companies_house_no}`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.organisation_name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(organisation.lead_applicant_email)
    ).toBeInTheDocument();
  });
});
