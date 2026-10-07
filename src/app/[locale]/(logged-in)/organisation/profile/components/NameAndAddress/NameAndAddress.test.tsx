import { mockedOrganisation } from "@/mocks/data/organisation";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import NameAndAddress from "./NameAndAddress";

const putProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("../../hooks/useUpdateOrganisation", () => ({
  __esModule: true,
  default: () => putProps,
}));

function setupTest() {
  return render(<NameAndAddress />);
}

const userData = {
  id: 1,
  first_name: "first",
  last_name: "last",
  email: "email@example.com",
  role: "SRO",
  departments: [{ id: 123, name: "Research" }],
};

function getAllInputs() {
  return [
    /Organisation name/,
    /Address 1/,
    /Address 2/,
    /Town/,
    /County/,
    /Country/,
    /Postcode/,
  ];
}

const organisation = mockedOrganisation();

describe("<NameAndAddress />", () => {
  beforeEach(() => {
    mockUseStore({
      config: { organisation, user: userData },
    });
    putProps.onSubmit.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all name/address fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Name & Address" });
    fireEvent.submit(form);

    const {
      organisation_name,
      address_1,
      address_2,
      county,
      country,
      town,
      postcode,
    } = organisation;

    await waitFor(() => {
      expect(putProps.onSubmit).toHaveBeenCalledWith({
        organisation_name,
        address_1,
        address_2,
        county,
        country,
        town,
        postcode,
      });
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", { name: "Name & Address" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(putProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
