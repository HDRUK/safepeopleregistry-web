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

const mutateUserMock = jest.fn().mockResolvedValue(null);
jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: jest.fn(() => ({
      mutateAsync: mutateUserMock,
    })),
  };
});

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
    mutateUserMock.mockClear();
    putProps.onSubmit.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main form fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Name and address" });
    fireEvent.submit(form);

    const {
      address_1,
      address_2,
      county,
      country,
      town,
      postcode,
      organisation_name,
    } = organisation;

    await waitFor(() => {
      expect(putProps.onSubmit).toHaveBeenCalledWith({
        address_1,
        address_2,
        county,
        country,
        town,
        postcode,
        organisation_name,
      });
    });

    await waitFor(() => {
      expect(mutateUserMock).toHaveBeenCalledWith(
        expect.objectContaining({ is_sro: true })
      );
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", { name: "Name and address" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(putProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
