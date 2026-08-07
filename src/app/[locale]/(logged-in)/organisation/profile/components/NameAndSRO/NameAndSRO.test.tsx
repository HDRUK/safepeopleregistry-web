import { mockedOrganisation } from "@/mocks/data/organisation";
import { fireEvent, render, screen, waitFor } from "@/utils/testUtils";
import NameAndSRO from "./NameAndSRO";

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
  return render(<NameAndSRO />);
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
  return [/Organisation name/];
}

const organisation = mockedOrganisation();

describe("<NameAndSRO />", () => {
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

  it("renders all name/SRO fields", () => {
    setupTest();

    const inputs = getAllInputs();

    inputs.forEach(selector => {
      expect(screen.getAllByLabelText(selector)[0]).toBeInTheDocument();
    });
  });

  it("submits the form when values are filled", async () => {
    setupTest();

    const form = await screen.findByRole("form", { name: "Name and SRO" });
    fireEvent.submit(form);

    const { organisation_name, sro_profile_uri } = organisation;

    await waitFor(() => {
      expect(putProps.onSubmit).toHaveBeenCalledWith({
        organisation_name,
        sro_profile_uri,
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

    const form = await screen.findByRole("form", { name: "Name and SRO" });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(putProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
