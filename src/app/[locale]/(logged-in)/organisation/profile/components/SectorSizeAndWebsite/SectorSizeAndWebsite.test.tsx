import {
  clearInputsByLabelText,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { mockedOrganisation } from "@/mocks/data/organisation";
import SectorSizeAndWebsite from "./SectorSizeAndWebsite";

const patchProps = {
  isError: false,
  isPending: false,
  error: null,
  onSubmit: jest.fn().mockResolvedValue(null),
};

jest.mock("../../hooks/useUpdateOrganisation", () => ({
  __esModule: true,
  default: () => patchProps,
}));

function setupTest() {
  return render(<SectorSizeAndWebsite />);
}

function getAllInputs() {
  return [/Sector/i, /Organisation website/i, /Size/i];
}

const organisation = mockedOrganisation();

describe("<SectorSizeAndWebsite />", () => {
  beforeEach(() => {
    mockUseStore({
      config: { organisation },
    });
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

    const form = await screen.findByRole("form", {
      name: "Sector size and website",
    });
    fireEvent.submit(form);

    const { sector_id, website, organisation_size } = organisation;

    await waitFor(() => {
      expect(patchProps.onSubmit).toHaveBeenCalledWith({
        sector_id,
        website,
        organisation_size,
      });
    });
  });

  it("does not submit the form when values are cleared", async () => {
    setupTest();

    clearInputsByLabelText(getAllInputs());

    const form = await screen.findByRole("form", {
      name: "Sector size and website",
    });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(patchProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
