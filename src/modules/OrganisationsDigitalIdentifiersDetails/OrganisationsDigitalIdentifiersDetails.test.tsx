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

  it("renders the ODS code if set", () => {
    const organisationWithOdsId = mockedOrganisation({
      ods_id: "ABC12",
    });

    setupTest({
      organisationData: organisationWithOdsId,
    });

    expect(screen.getByText("ODS Code")).toBeInTheDocument();
    expect(screen.getByText(organisationWithOdsId.ods_id)).toBeInTheDocument();
  });

  it("does not render the ODS code if not set", () => {
    setupTest();

    expect(screen.queryByText("ODS Code")).not.toBeInTheDocument();
  });

  it("does not render the ODS code if blank", () => {
    setupTest({
      organisationData: mockedOrganisation({
        ods_id: "  ",
      }),
    });

    expect(screen.queryByText("ODS Code")).not.toBeInTheDocument();
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
