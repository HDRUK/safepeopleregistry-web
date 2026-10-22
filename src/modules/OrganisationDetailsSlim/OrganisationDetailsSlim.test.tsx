import { useQuery } from "@tanstack/react-query";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { mockedUser } from "@/mocks/data/user";
import { render, screen } from "@/utils/testUtils";
import { getName } from "@/utils/application";
import OrganisationDetailsSlim, {
  OrganisationDetailsSlimProps,
} from "./OrganisationDetailsSlim";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const organisation = mockedOrganisation();
const delegate = mockedUser();

const defaultProps = {
  organisation,
};

const setupTest = (props?: OrganisationDetailsSlimProps) => {
  return render(<OrganisationDetailsSlim {...defaultProps} {...props} />);
};

describe("<OrganisationsDigitalIdentifiersDetails />", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: { data: [delegate] } });
  });

  it("renders all main fields with correct values", () => {
    setupTest();

    expect(
      screen.getByText(organisation.organisation_name)
    ).toBeInTheDocument();

    expect(screen.getByText(getName(delegate))).toBeInTheDocument();

    expect(
      screen.getByText(getName(organisation.sro_officer!))
    ).toBeInTheDocument();
  });
});
